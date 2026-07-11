<?php

use App\Models\Classlevel;
use App\Models\HomeroomTeacher;
use App\Models\Loan;
use App\Models\Major;
use App\Models\Student;
use App\Models\User;

function seedLetterLookups(): void
{
    foreach (['PPLG', 'TKR', 'TBSM', 'MPLB'] as $alias) {
        Major::create(['full_name' => "Jurusan $alias", 'alias' => $alias]);
    }
    Classlevel::create(['level' => 10]);
}

function actingAsLetterUser(): User
{
    $user = User::factory()->create();
    test()->actingAs($user);

    return $user;
}

beforeEach(function () {
    seedLetterLookups();
});

test('guests are redirected to login for overdue letter', function () {
    $this->get(route('loans.overdue-letter'))->assertRedirect(route('login'));
});

test('can download overdue letter PDF when no overdue loans', function () {
    actingAsLetterUser();

    $response = $this->get(route('loans.overdue-letter'));

    $response->assertOk();
    expect($response->headers->get('Content-Type'))->toContain('application/pdf');
    expect($response->headers->get('Content-Disposition'))->toContain('surat-panggilan-overdue.pdf');
});

test('can download overdue letter PDF when user is not proktor', function () {
    $user = User::factory()->create(['role' => 'staff']);
    $this->actingAs($user);
    Loan::factory()->create();

    $response = $this->get(route('loans.overdue-letter'));

    $response->assertOk();
    expect($response->headers->get('Content-Type'))->toContain('application/pdf');
});

test('can download overdue letter PDF with overdue loans', function () {
    actingAsLetterUser();

    $pplg = Major::where('alias', 'PPLG')->first();
    $student = Student::factory()->create([
        'major_id' => $pplg->id,
    ]);

    Loan::factory()->create([
        'student_id' => $student->id,
        'borrower_date' => now()->subDays(5),
    ]);

    Loan::factory()->create([
        'student_id' => $student->id,
        'borrower_date' => now()->subDays(3),
    ]);

    HomeroomTeacher::create([
        'name' => 'Pak Guru',
        'major' => 'PPLG',
        'phone' => '08123456789',
    ]);

    $response = $this->get(route('loans.overdue-letter'));

    $response->assertOk();
    expect($response->headers->get('Content-Type'))->toContain('application/pdf');
    expect($response->headers->get('Content-Disposition'))->toContain('surat-panggilan-overdue.pdf');

    $response->assertDownload('surat-panggilan-overdue.pdf');
});

test('only includes overdue loans in PDF, not returned loans', function () {
    actingAsLetterUser();

    $tkr = Major::where('alias', 'TKR')->first();
    $student = Student::factory()->create([
        'major_id' => $tkr->id,
    ]);

    Loan::factory()->create([
        'student_id' => $student->id,
        'borrower_date' => now()->subDays(5),
    ]);

    Loan::factory()->returned()->create([
        'student_id' => $student->id,
        'borrower_date' => now()->subDays(10),
    ]);

    $response = $this->get(route('loans.overdue-letter'));

    $response->assertOk();
    expect($response->headers->get('Content-Type'))->toContain('application/pdf');
});
