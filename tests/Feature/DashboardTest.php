<?php

use App\Models\Item;
use App\Models\Student;
use App\Models\User;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertOk();
});

test('dashboard displays correct stats', function () {
    $major = \App\Models\Major::create(['full_name' => 'Test', 'alias' => 'TST']);
    $class = \App\Models\Classlevel::create(['level' => 10]);

    Item::factory()->count(3)->create(['status' => 'available']);
    Item::factory()->count(2)->create(['status' => 'inavailable']);
    Student::factory()->count(4)->create([
        'major_id' => $major->id,
        'class_id' => $class->id,
    ]);

    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertInertia(fn ($page) => $page
        ->component('dashboard')
        ->has('stats.items', fn ($items) => $items
            ->where('total', 5)
            ->where('available', 3)
            ->where('borrowed', 2)
        )
        ->where('stats.students', 4)
        ->has('recentLoans')
    );
});
