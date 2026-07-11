<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('deposits:check-pickups')->dailyAt('08:00');
Schedule::command('loans:check-overdue')->dailyAt('08:00');
