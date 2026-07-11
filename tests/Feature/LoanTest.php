<?php

use App\Models\Classlevel;
use App\Models\Item;
use App\Models\Loan;
use App\Models\Major;
use App\Models\Student;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

function seedLookups(): void
{
    Major::create(['full_name' => 'Test Major', 'alias' => 'TM']);
    Classlevel::create(['level' => 10]);
}

function actingAsUser(): User
{
    $user = User::factory()->create();
    test()->actingAs($user);

    return $user;
}

beforeEach(function () {
    seedLookups();
});

// ─── Guest Access ───────────────────────────────────────────────────

test('guests are redirected to login for loans index', function () {
    $this->get(route('loans.index'))->assertRedirect(route('login'));
});

test('guests are redirected to login for loans returned', function () {
    $this->get(route('loans.returned'))->assertRedirect(route('login'));
});

test('guests are redirected to login for loans create', function () {
    $this->get(route('loans.create'))->assertRedirect(route('login'));
});

test('guests are redirected to login for loans store', function () {
    $this->post(route('loans.store'))->assertRedirect(route('login'));
});

test('guests are redirected to login for loans edit', function () {
    $this->get(route('loans.edit', ['loan' => 1]))->assertRedirect(route('login'));
});

test('guests are redirected to login for loans update', function () {
    $this->put(route('loans.update', ['loan' => 1]))->assertRedirect(route('login'));
});

test('guests are redirected to login for loans destroy', function () {
    $this->delete(route('loans.destroy', ['loan' => 1]))->assertRedirect(route('login'));
});

test('guests are redirected to login for loans return', function () {
    $this->put(route('loans.return', ['loan' => 1]))->assertRedirect(route('login'));
});

test('guests are redirected to login for loans pdf', function () {
    $this->get(route('loans.pdf'))->assertRedirect(route('login'));
});

// ─── Index ──────────────────────────────────────────────────────────

test('can view loans index page', function () {
    actingAsUser();
    $loan = Loan::factory()->create();

    $response = $this->get(route('loans.index'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Loans/Index')
        ->has('groups')
        ->has('filter')
        ->has('period')
    );
});

test('loans index shows borrowed and returned loans by filter', function () {
    actingAsUser();
    $borrowed = Loan::factory()->create();
    $returned = Loan::factory()->returned()->create();

    $all = $this->get(route('loans.index', ['filter' => 'all']));
    $all->assertInertia(fn (Assert $page) => $page
        ->where('filter', 'all')
    );

    $borrowedRes = $this->get(route('loans.index', ['filter' => 'borrowed']));
    $borrowedRes->assertInertia(fn (Assert $page) => $page
        ->where('filter', 'borrowed')
    );

    $returnedRes = $this->get(route('loans.index', ['filter' => 'returned']));
    $returnedRes->assertInertia(fn (Assert $page) => $page
        ->where('filter', 'returned')
    );
});

test('loans index can be grouped by different periods', function () {
    actingAsUser();
    Loan::factory()->create(['borrower_date' => now()]);
    Loan::factory()->create(['borrower_date' => now()->subDays(5)]);

    $day = $this->get(route('loans.index', ['period' => 'day']));
    $day->assertInertia(fn (Assert $page) => $page->where('period', 'day'));

    $week = $this->get(route('loans.index', ['period' => 'week']));
    $week->assertInertia(fn (Assert $page) => $page->where('period', 'week'));

    $month = $this->get(route('loans.index', ['period' => 'month']));
    $month->assertInertia(fn (Assert $page) => $page->where('period', 'month'));

    $year = $this->get(route('loans.index', ['period' => 'year']));
    $year->assertInertia(fn (Assert $page) => $page->where('period', 'year'));
});

// ─── Returned ───────────────────────────────────────────────────────

test('can view returned loans page', function () {
    actingAsUser();

    $response = $this->get(route('loans.returned'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Loans/Returned')
        ->has('groups')
        ->has('period')
    );
});

test('returned page shows only returned loans', function () {
    actingAsUser();
    Loan::factory()->create();
    $returned = Loan::factory()->returned()->create();

    $response = $this->get(route('loans.returned'));

    $response->assertInertia(fn (Assert $page) => $page
        ->has('groups', 1)
    );
});

// ─── Create ─────────────────────────────────────────────────────────

test('can view create loan form', function () {
    actingAsUser();
    Item::factory()->count(3)->create();
    Student::factory()->count(2)->create();

    $response = $this->get(route('loans.create'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Loans/Create')
        ->has('items', 3)
        ->has('students', 2)
    );
});

// ─── Store ──────────────────────────────────────────────────────────

test('can create a single loan with a single item', function () {
    $user = actingAsUser();
    $item = Item::factory()->create();

    $this->post(route('loans.store'), [
        'entries' => [
            ['student_id' => null, 'borrower_name' => 'John Doe', 'item_ids' => [$item->id]],
        ],
        'borrower_role' => 'student',
        'collateral_type' => 'Kartu Pelajar',
        'borrower_date' => now()->format('Y-m-d H:i:s'),
    ])->assertRedirect(route('loans.index'));

    expect(Loan::count())->toBe(1);
    expect($item->fresh()->status)->toBe('inavailable');
});

test('can create a single loan with multiple items', function () {
    $user = actingAsUser();
    $items = Item::factory()->count(3)->create();

    $this->post(route('loans.store'), [
        'entries' => [
            ['student_id' => null, 'borrower_name' => 'John Doe', 'item_ids' => $items->pluck('id')->toArray()],
        ],
        'borrower_role' => 'student',
        'collateral_type' => 'Kartu Pelajar',
        'borrower_date' => now()->format('Y-m-d H:i:s'),
    ])->assertRedirect(route('loans.index'));

    expect(Loan::count())->toBe(3);
    $items->each(fn ($item) => expect($item->fresh()->status)->toBe('inavailable'));
});

test('can create multiple entries in one request', function () {
    $user = actingAsUser();
    $items = Item::factory()->count(2)->create();

    $this->post(route('loans.store'), [
        'entries' => [
            ['student_id' => null, 'borrower_name' => 'Alice', 'item_ids' => [$items[0]->id]],
            ['student_id' => null, 'borrower_name' => 'Bob', 'item_ids' => [$items[1]->id]],
        ],
        'borrower_role' => 'student',
        'collateral_type' => 'Kartu Pelajar',
        'borrower_date' => now()->format('Y-m-d H:i:s'),
    ])->assertRedirect(route('loans.index'));

    expect(Loan::count())->toBe(2);
});

test('store requires borrower_name', function () {
    $user = actingAsUser();

    $this->post(route('loans.store'), [
        'entries' => [
            ['student_id' => null, 'borrower_name' => '', 'item_ids' => [1]],
        ],
        'borrower_role' => 'student',
        'collateral_type' => 'Kartu Pelajar',
        'borrower_date' => now()->format('Y-m-d H:i:s'),
    ])->assertSessionHasErrors(['entries.0.borrower_name']);
});

test('store requires item_ids', function () {
    $user = actingAsUser();

    $this->post(route('loans.store'), [
        'entries' => [
            ['student_id' => null, 'borrower_name' => 'John', 'item_ids' => []],
        ],
        'borrower_role' => 'student',
        'collateral_type' => 'Kartu Pelajar',
        'borrower_date' => now()->format('Y-m-d H:i:s'),
    ])->assertSessionHasErrors(['entries.0.item_ids']);
});

test('fails when item is already borrowed', function () {
    $user = actingAsUser();
    $student = Student::factory()->create();
    $item = Item::factory()->inavailable()->create();

    $this->post(route('loans.store'), [
        'entries' => [
            ['student_id' => $student->id, 'borrower_name' => 'John', 'item_ids' => [$item->id]],
        ],
        'borrower_role' => 'student',
        'collateral_type' => 'Kartu Pelajar',
        'borrower_date' => now()->format('Y-m-d H:i:s'),
    ])->assertSessionHasErrors();

    expect(Loan::count())->toBe(0);
});

test('can create loan with student association', function () {
    $user = actingAsUser();
    $item = Item::factory()->create();
    $student = Student::factory()->create();

    $this->post(route('loans.store'), [
        'entries' => [
            ['student_id' => $student->id, 'borrower_name' => $student->name, 'item_ids' => [$item->id]],
        ],
        'borrower_role' => 'student',
        'collateral_type' => 'Kartu Pelajar',
        'borrower_date' => now()->format('Y-m-d H:i:s'),
    ])->assertRedirect(route('loans.index'));

    expect(Loan::first()->student_id)->toBe($student->id);
});

// ─── Edit ───────────────────────────────────────────────────────────

test('can view edit loan form', function () {
    $user = actingAsUser();
    $loan = Loan::factory()->create();

    $response = $this->get(route('loans.edit', ['loan' => $loan->id]));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Loans/Edit')
        ->has('loan')
        ->has('items')
        ->has('students')
    );
});

test('edit returns 404 for non-existent loan', function () {
    actingAsUser();

    $this->get(route('loans.edit', ['loan' => 99999]))
        ->assertNotFound();
});

// ─── Update ─────────────────────────────────────────────────────────

test('can update a loan', function () {
    $user = actingAsUser();
    $student = Student::factory()->create();
    $loan = Loan::factory()->create();
    $newItem = Item::factory()->create();

    $this->put(route('loans.update', ['loan' => $loan->id]), [
        'item_id' => $newItem->id,
        'student_id' => $student->id,
        'borrower_name' => 'Updated Name',
        'borrower_role' => 'teacher',
        'collateral_type' => 'KTP',
        'borrower_date' => now()->format('Y-m-d H:i:s'),
    ])->assertRedirect(route('loans.index'));

    expect($loan->fresh()->borrower_name)->toBe('Updated Name');
    expect($loan->fresh()->item_id)->toBe($newItem->id);
});

test('update requires borrower_name', function () {
    $user = actingAsUser();
    $student = Student::factory()->create();
    $loan = Loan::factory()->create();

    $this->put(route('loans.update', ['loan' => $loan->id]), [
        'item_id' => $loan->item_id,
        'student_id' => $student->id,
        'borrower_name' => '',
        'borrower_role' => 'student',
        'collateral_type' => 'Kartu Pelajar',
        'borrower_date' => now()->format('Y-m-d H:i:s'),
    ])->assertSessionHasErrors(['borrower_name']);
});

// ─── Destroy ────────────────────────────────────────────────────────

test('can delete a loan', function () {
    $user = actingAsUser();
    $loan = Loan::factory()->create();

    $this->delete(route('loans.destroy', ['loan' => $loan->id]))
        ->assertRedirect(route('loans.index'));

    expect(Loan::find($loan->id))->toBeNull();
});

test('deleting a loan restores item status to available', function () {
    $user = actingAsUser();
    $item = Item::factory()->inavailable()->create();
    $loan = Loan::factory()->create(['item_id' => $item->id]);

    expect($item->fresh()->status)->toBe('inavailable');

    $this->delete(route('loans.destroy', ['loan' => $loan->id]));

    expect($item->fresh()->status)->toBe('available');
});

test('destroy returns 404 for non-existent loan', function () {
    actingAsUser();

    $this->delete(route('loans.destroy', ['loan' => 99999]))
        ->assertNotFound();
});

// ─── Return ─────────────────────────────────────────────────────────

test('can return a borrowed loan', function () {
    $user = actingAsUser();
    $item = Item::factory()->inavailable()->create();
    $loan = Loan::factory()->create(['item_id' => $item->id]);

    $this->put(route('loans.return', ['loan' => $loan->id]))
        ->assertRedirect(route('loans.index'));

    expect($loan->fresh()->returned)->not->toBeNull();
    expect($loan->fresh()->user_in_id)->toBe($user->id);
    expect($item->fresh()->status)->toBe('available');
});

test('cannot return an already returned loan', function () {
    $user = actingAsUser();
    $loan = Loan::factory()->returned()->create();

    $this->put(route('loans.return', ['loan' => $loan->id]))
        ->assertRedirect(route('loans.index'));
});

test('return returns 404 for non-existent loan', function () {
    actingAsUser();

    $this->put(route('loans.return', ['loan' => 99999]))
        ->assertNotFound();
});

// ─── PDF Export ─────────────────────────────────────────────────────

test('can download loans pdf', function () {
    actingAsUser();
    Loan::factory()->create();
    Loan::factory()->returned()->create();

    $response = $this->get(route('loans.pdf'));

    $response->assertOk();
    expect($response->headers->get('Content-Type'))->toContain('application/pdf');
    expect($response->headers->get('Content-Disposition'))->toContain('all-loans.pdf');
});

test('can download loans pdf with period filter', function () {
    actingAsUser();
    Loan::factory()->create();
    Loan::factory()->returned()->create();

    $response = $this->get(route('loans.pdf', ['period' => 'month']));

    $response->assertOk();
    expect($response->headers->get('Content-Type'))->toContain('application/pdf');
});
