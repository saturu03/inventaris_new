<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>All Loans Report</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        h1 { text-align: center; font-size: 18px; margin-bottom: 4px; }
        .subtitle { text-align: center; font-size: 12px; color: #6b7280; margin-bottom: 20px; }
        h2 { font-size: 14px; margin-top: 24px; margin-bottom: 4px; }
        h3 { font-size: 13px; margin-top: 16px; margin-bottom: 6px; padding: 4px 8px; background: #f3f4f6; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
        th, td { border: 1px solid #d1d5db; padding: 6px 8px; text-align: left; font-size: 11px; }
        th { background: #e5e7eb; font-weight: 600; }
        .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 3px;
            font-size: 10px;
            font-weight: 600;
        }
        .badge-borrowed { background: #fef3c7; color: #92400e; }
        .badge-returned { background: #d1fae5; color: #065f46; }
        .footer { position: fixed; bottom: 0; width: 100%; text-align: center; font-size: 10px; color: #9ca3af; padding: 10px 0; }
    </style>
</head>
<body>
    <h1>Loan Report</h1>
    <p class="subtitle">Generated on {{ now()->format('d F Y H:i') }}</p>

    <h2>Borrowed</h2>
    @if(empty($borrowedGroups))
        <p style="color: #6b7280; font-style: italic;">No borrowed loans.</p>
    @else
        @foreach($borrowedGroups as $group)
            <h3>{{ $group['label'] }} ({{ count($group['loans']) }})</h3>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Borrower</th>
                        <th>Class</th>
                        <th>Major</th>
                        <th>Role</th>
                        <th>Borrow Date</th>
                        <th>Officer</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($group['loans'] as $i => $loan)
                    <tr>
                        <td>{{ $i + 1 }}</td>
                        <td>{{ $loan->item->name }}</td>
                        <td>{{ $loan->borrower_name }}</td>
                        <td>{{ $loan->student?->class?->level ?? '-' }}</td>
                        <td>{{ $loan->student?->major?->alias ?? '-' }}</td>
                        <td>{{ ucfirst($loan->borrower_role) }}</td>
                        <td>{{ $loan->borrower_date ? Carbon\Carbon::parse($loan->borrower_date)->format('d M Y H:i') : '-' }}</td>
                        <td>{{ $loan->userOut->name ?? '-' }}</td>
                        <td><span class="badge badge-borrowed">Borrowed</span></td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        @endforeach
    @endif

    <h2>Returned</h2>
    @if(empty($returnedGroups))
        <p style="color: #6b7280; font-style: italic;">No returned loans.</p>
    @else
        @foreach($returnedGroups as $group)
            <h3>{{ $group['label'] }} ({{ count($group['loans']) }})</h3>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Borrower</th>
                        <th>Class</th>
                        <th>Major</th>
                        <th>Role</th>
                        <th>Borrow Date</th>
                        <th>Returned Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($group['loans'] as $i => $loan)
                    <tr>
                        <td>{{ $i + 1 }}</td>
                        <td>{{ $loan->item->name }}</td>
                        <td>{{ $loan->borrower_name }}</td>
                        <td>{{ $loan->student?->class?->level ?? '-' }}</td>
                        <td>{{ $loan->student?->major?->alias ?? '-' }}</td>
                        <td>{{ ucfirst($loan->borrower_role) }}</td>
                        <td>{{ $loan->borrower_date ? Carbon\Carbon::parse($loan->borrower_date)->format('d M Y H:i') : '-' }}</td>
                        <td>{{ $loan->returned ? Carbon\Carbon::parse($loan->returned)->format('d M Y H:i') : '-' }}</td>
                        <td><span class="badge badge-returned">Returned</span></td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        @endforeach
    @endif

    @php
        $totalBorrowed = collect($borrowedGroups)->sum(fn($g) => count($g['loans']));
        $totalReturned = collect($returnedGroups)->sum(fn($g) => count($g['loans']));
    @endphp
    <div class="footer">
        Total: {{ $totalBorrowed + $totalReturned }} loans
    </div>
</body>
</html>
