'use client';

import React from 'react';

export const ComplexityAnalysis: React.FC = () => {
	const algorithms = [
		{
			name: 'Merge Sort',
			best: 'O(n log n)',
			average: 'O(n log n)',
			worst: 'O(n log n)',
			space: 'O(n)',
			stable: 'Yes',
			description: 'Divide and conquer, stable, guaranteed performance',
			pros: ['Stable', 'Guaranteed O(n log n)', 'Good for large datasets'],
			cons: ['Requires O(n) extra space', 'Not in-place'],
		},
		{
			name: 'Quick Sort',
			best: 'O(n log n)',
			average: 'O(n log n)',
			worst: 'O(n²)',
			space: 'O(log n)',
			stable: 'No',
			description: 'Divide and conquer, in-place, cache-friendly',
			pros: ['In-place', 'Cache-friendly', 'Fast in practice'],
			cons: [
				'Worst case O(n²)',
				'Not stable',
				'Performance depends on pivot selection',
			],
		},
		{
			name: 'Bubble Sort',
			best: 'O(n)',
			average: 'O(n²)',
			worst: 'O(n²)',
			space: 'O(1)',
			stable: 'Yes',
			description: 'Simple but inefficient comparison sort',
			pros: ['Simple to implement', 'Stable', 'In-place'],
			cons: ['Very slow', 'O(n²) average case'],
		},
		{
			name: 'Selection Sort',
			best: 'O(n²)',
			average: 'O(n²)',
			worst: 'O(n²)',
			space: 'O(1)',
			stable: 'No',
			description: 'Finds minimum element and swaps',
			pros: ['Simple', 'In-place', 'Minimal swaps'],
			cons: ['Always O(n²)', 'Not stable'],
		},
		{
			name: 'Insertion Sort',
			best: 'O(n)',
			average: 'O(n²)',
			worst: 'O(n²)',
			space: 'O(1)',
			stable: 'Yes',
			description: 'Builds sorted array one element at a time',
			pros: ['Simple', 'Stable', 'Good for small datasets'],
			cons: ['O(n²) average case', 'Not efficient for large datasets'],
		},
		{
			name: 'Heap Sort',
			best: 'O(n log n)',
			average: 'O(n log n)',
			worst: 'O(n log n)',
			space: 'O(1)',
			stable: 'No',
			description: 'Uses heap data structure',
			pros: ['Guaranteed O(n log n)', 'In-place'],
			cons: ['Not stable', 'Slower than Quick Sort in practice'],
		},
	];

	return (
		<div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
			<div className="p-4 border-b border-gray-700">
				<h2 className="text-xl font-semibold text-white">
					Complexity Analysis & Comparison
				</h2>
			</div>

			<div className="p-4">
				{/* Summary Table */}
				<div className="overflow-x-auto mb-6">
					<table className="min-w-full table-auto">
						<thead>
							<tr className="bg-gray-700">
								<th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Algorithm
								</th>
								<th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Best Case
								</th>
								<th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Average Case
								</th>
								<th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Worst Case
								</th>
								<th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Space
								</th>
								<th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Stable
								</th>
							</tr>
						</thead>
						<tbody className="bg-gray-800 divide-y divide-gray-700">
							{algorithms.map((algo, index) => (
								<tr
									key={index}
									className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}
								>
									<td className="px-4 py-2 text-sm font-medium text-white">
										{algo.name}
									</td>
									<td className="px-4 py-2 text-sm text-gray-300">
										{algo.best}
									</td>
									<td className="px-4 py-2 text-sm text-gray-300">
										{algo.average}
									</td>
									<td className="px-4 py-2 text-sm text-gray-300">
										{algo.worst}
									</td>
									<td className="px-4 py-2 text-sm text-gray-300">
										{algo.space}
									</td>
									<td className="px-4 py-2 text-sm text-gray-300">
										{algo.stable}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Detailed Analysis */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-white">
						Detailed Analysis
					</h3>

					{algorithms.slice(0, 2).map((algo, index) => (
						<div
							key={index}
							className="border border-gray-600 rounded-lg p-4 bg-gray-900/50"
						>
							<h4 className="text-md font-semibold text-white mb-2">
								{algo.name}
							</h4>
							<p className="text-sm text-gray-400 mb-3">{algo.description}</p>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<h5 className="text-sm font-medium text-green-400 mb-1">
										Advantages:
									</h5>
									<ul className="text-xs text-gray-300 space-y-1">
										{algo.pros.map((pro, i) => (
											<li key={i}>• {pro}</li>
										))}
									</ul>
								</div>
								<div>
									<h5 className="text-sm font-medium text-red-400 mb-1">
										Disadvantages:
									</h5>
									<ul className="text-xs text-gray-300 space-y-1">
										{algo.cons.map((con, i) => (
											<li key={i}>• {con}</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* When to Use */}
				<div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-700">
					<h3 className="text-lg font-semibold text-blue-400 mb-3">
						When to Use Each Algorithm
					</h3>
					<div className="space-y-2 text-sm text-blue-300">
						<div>
							<strong>Merge Sort:</strong> When you need guaranteed O(n log n)
							performance and stability is important
						</div>
						<div>
							<strong>Quick Sort:</strong> When you need in-place sorting and
							average performance is acceptable
						</div>
						<div>
							<strong>Insertion Sort:</strong> For small datasets or when the
							array is nearly sorted
						</div>
						<div>
							<strong>Heap Sort:</strong> When you need guaranteed O(n log n)
							and in-place sorting
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
