'use client';

import React, { useEffect, useState } from 'react';
import { AlgorithmCode } from './AlgorithmCode';
import { ComplexityAnalysis } from './ComplexityAnalysis';
import { LanguageSelector } from './LanguageSelector';
import { SortingAnimation } from './SortingAnimation';

export interface SortingData {
	array: number[];
	comparisons: number;
	swaps: number;
	time: number;
	steps: AlgorithmStep[];
}

export interface AlgorithmStep {
	array: number[];
	comparisons: number;
	swaps: number;
	description: string;
	highlightedIndices?: number[];
	stepType: 'compare' | 'swap' | 'merge' | 'partition' | 'complete';
}

export const SortingVisualizer: React.FC = () => {
	const [selectedLanguage, setSelectedLanguage] = useState<
		'c' | 'cpp' | 'java'
	>('c');
	const [arraySize, setArraySize] = useState(20);
	const [isAnimating, setIsAnimating] = useState(false);
	const [mergeSortData, setMergeSortData] = useState<SortingData>({
		array: [],
		comparisons: 0,
		swaps: 0,
		time: 0,
		steps: [],
	});
	const [quickSortData, setQuickSortData] = useState<SortingData>({
		array: [],
		comparisons: 0,
		swaps: 0,
		time: 0,
		steps: [],
	});
	const [currentStep, setCurrentStep] = useState(0);
	const [isStepByStep, setIsStepByStep] = useState(false);
	const [animationSpeed, setAnimationSpeed] = useState(500);

	// Generate random array
	const generateRandomArray = (size: number): number[] => {
		return Array.from(
			{ length: size },
			() => Math.floor(Math.random() * 100) + 1
		);
	};

	// Initialize with random array
	useEffect(() => {
		const initialArray = generateRandomArray(arraySize);
		setMergeSortData((prev) => ({ ...prev, array: [...initialArray] }));
		setQuickSortData((prev) => ({ ...prev, array: [...initialArray] }));
	}, [arraySize]);

	// Merge Sort implementation with step tracking
	const mergeSort = async (arr: number[]): Promise<SortingData> => {
		const startTime = performance.now();
		let comparisons = 0;
		const swaps = 0;
		const steps: AlgorithmStep[] = [];
		const workingArray = [...arr];

		const addStep = (
			description: string,
			stepType: AlgorithmStep['stepType'],
			highlightedIndices?: number[]
		) => {
			steps.push({
				array: [...workingArray],
				comparisons,
				swaps,
				description,
				stepType,
				highlightedIndices,
			});
		};

		const merge = (
			left: number[],
			right: number[],
			startIdx: number
		): number[] => {
			const result: number[] = [];
			let i = 0,
				j = 0;

			while (i < left.length && j < right.length) {
				comparisons++;
				addStep(`Comparing ${left[i]} and ${right[j]}`, 'compare', [
					startIdx + i,
					startIdx + left.length + j,
				]);

				if (left[i] <= right[j]) {
					result.push(left[i]);
					i++;
				} else {
					result.push(right[j]);
					j++;
				}
			}

			const merged = result.concat(left.slice(i)).concat(right.slice(j));

			// Update working array
			for (let k = 0; k < merged.length; k++) {
				workingArray[startIdx + k] = merged[k];
			}

			addStep(
				`Merged subarray`,
				'merge',
				Array.from({ length: merged.length }, (_, k) => startIdx + k)
			);
			return merged;
		};

		const mergeSortRecursive = (
			arr: number[],
			startIdx: number = 0
		): number[] => {
			if (arr.length <= 1) return arr;

			const mid = Math.floor(arr.length / 2);
			const left = mergeSortRecursive(arr.slice(0, mid), startIdx);
			const right = mergeSortRecursive(arr.slice(mid), startIdx + mid);

			return merge(left, right, startIdx);
		};

		addStep('Starting Merge Sort', 'complete');
		const sortedArray = mergeSortRecursive([...arr]);
		addStep('Merge Sort Complete', 'complete');

		const endTime = performance.now();

		return {
			array: sortedArray,
			comparisons,
			swaps,
			time: endTime - startTime,
			steps,
		};
	};

	// Quick Sort implementation with step tracking
	const quickSort = async (arr: number[]): Promise<SortingData> => {
		const startTime = performance.now();
		let comparisons = 0;
		let swaps = 0;
		const steps: AlgorithmStep[] = [];
		const workingArray = [...arr];

		const addStep = (
			description: string,
			stepType: AlgorithmStep['stepType'],
			highlightedIndices?: number[]
		) => {
			steps.push({
				array: [...workingArray],
				comparisons,
				swaps,
				description,
				stepType,
				highlightedIndices,
			});
		};

		const partition = (arr: number[], low: number, high: number): number => {
			const pivot = arr[high];
			let i = low - 1;

			addStep(`Partitioning with pivot ${pivot}`, 'partition', [high]);

			for (let j = low; j < high; j++) {
				comparisons++;
				addStep(`Comparing ${arr[j]} with pivot ${pivot}`, 'compare', [
					j,
					high,
				]);

				if (arr[j] <= pivot) {
					i++;
					if (i !== j) {
						[arr[i], arr[j]] = [arr[j], arr[i]];
						swaps++;
						addStep(`Swapped ${arr[j]} and ${arr[i]}`, 'swap', [i, j]);
					}
				}
			}

			[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
			swaps++;
			addStep(`Placed pivot ${pivot} at position ${i + 1}`, 'swap', [
				i + 1,
				high,
			]);

			return i + 1;
		};

		const quickSortRecursive = (
			arr: number[],
			low: number,
			high: number
		): void => {
			if (low < high) {
				const pi = partition(arr, low, high);
				quickSortRecursive(arr, low, pi - 1);
				quickSortRecursive(arr, pi + 1, high);
			}
		};

		addStep('Starting Quick Sort', 'complete');
		const sortedArray = [...arr];
		quickSortRecursive(sortedArray, 0, sortedArray.length - 1);
		addStep('Quick Sort Complete', 'complete');

		const endTime = performance.now();

		return {
			array: sortedArray,
			comparisons,
			swaps,
			time: endTime - startTime,
			steps,
		};
	};

	const handleRunAlgorithms = async () => {
		setIsAnimating(true);

		const initialArray = generateRandomArray(arraySize);

		// Run both algorithms
		const [mergeResult, quickResult] = await Promise.all([
			mergeSort(initialArray),
			quickSort(initialArray),
		]);

		setMergeSortData(mergeResult);
		setQuickSortData(quickResult);

		setIsAnimating(false);
	};

	const handleGenerateNewArray = () => {
		const newArray = generateRandomArray(arraySize);
		setMergeSortData((prev) => ({ ...prev, array: [...newArray] }));
		setQuickSortData((prev) => ({ ...prev, array: [...newArray] }));
	};

	return (
		<div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
			{/* Header with Controls */}
			<div className="bg-gray-800 border-b border-gray-700 p-3">
				<div className="flex items-center justify-between">
					<h1 className="text-lg font-bold text-white">
						Sorting Algorithms Visualizer
					</h1>

					<div className="flex items-center gap-3">
						<LanguageSelector
							selectedLanguage={selectedLanguage}
							onLanguageChange={setSelectedLanguage}
						/>

						<div className="flex items-center gap-2">
							<label className="text-xs font-medium text-gray-300">Size:</label>
							<input
								type="range"
								min="5"
								max="20"
								value={arraySize}
								onChange={(e) => setArraySize(Number(e.target.value))}
								className="w-16 accent-blue-500"
								disabled={isAnimating}
							/>
							<span className="text-xs text-gray-400 w-4">{arraySize}</span>
						</div>

						<button
							onClick={handleGenerateNewArray}
							disabled={isAnimating}
							className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							New Array
						</button>

						<button
							onClick={handleRunAlgorithms}
							disabled={isAnimating}
							className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							{isAnimating ? 'Running...' : 'Run'}
						</button>

						<button
							onClick={() => setIsStepByStep(!isStepByStep)}
							className={`px-2 py-1 rounded text-xs transition-colors ${
								isStepByStep
									? 'bg-purple-600 text-white hover:bg-purple-700'
									: 'bg-gray-600 text-white hover:bg-gray-700'
							}`}
						>
							{isStepByStep ? 'Disable' : 'Enable'} Steps
						</button>
					</div>
				</div>
			</div>

			{/* Main Content - 2 Column Layout */}
			<div className="flex-1 flex overflow-hidden">
				{/* Left Column - Visualization & Analysis */}
				<div className="w-1/2 border-r border-gray-700 overflow-y-auto">
					<div className="p-4 space-y-4">
						<SortingAnimation
							mergeSortData={mergeSortData}
							quickSortData={quickSortData}
							isAnimating={isAnimating}
							isStepByStep={isStepByStep}
							currentStep={currentStep}
							setCurrentStep={setCurrentStep}
							animationSpeed={animationSpeed}
						/>
						<ComplexityAnalysis />
					</div>
				</div>

				{/* Right Column - Code Only */}
				<div className="w-1/2 overflow-y-auto">
					<div className="p-4">
						<AlgorithmCode
							language={selectedLanguage}
							mergeSortData={mergeSortData}
							quickSortData={quickSortData}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
