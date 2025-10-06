'use client';

import React, { useEffect, useState } from 'react';
import { SortingData } from './SortingVisualizer';

interface SortingAnimationProps {
	mergeSortData: SortingData;
	quickSortData: SortingData;
	isAnimating: boolean;
	isStepByStep: boolean;
	currentStep: number;
	setCurrentStep: (step: number) => void;
	animationSpeed: number;
}

export const SortingAnimation: React.FC<SortingAnimationProps> = ({
	mergeSortData,
	quickSortData,
	isAnimating,
	isStepByStep,
	currentStep,
	setCurrentStep,
	animationSpeed,
}) => {
	const [activeAlgorithm, setActiveAlgorithm] = useState<'merge' | 'quick'>(
		'merge'
	);
	const [isPlaying, setIsPlaying] = useState(false);

	const currentData =
		activeAlgorithm === 'merge' ? mergeSortData : quickSortData;
	const maxValue = Math.max(...currentData.array, 1);

	// Auto-play step-by-step animation
	useEffect(() => {
		if (isStepByStep && isPlaying && currentData.steps.length > 0) {
			const timer = setTimeout(() => {
				if (currentStep < currentData.steps.length - 1) {
					setCurrentStep(currentStep + 1);
				} else {
					setIsPlaying(false);
				}
			}, animationSpeed);

			return () => clearTimeout(timer);
		}
	}, [
		currentStep,
		isPlaying,
		isStepByStep,
		currentData.steps.length,
		animationSpeed,
		setCurrentStep,
	]);

	const handlePlay = () => {
		if (currentStep >= currentData.steps.length - 1) {
			setCurrentStep(0);
		}
		setIsPlaying(!isPlaying);
	};

	const handleReset = () => {
		setCurrentStep(0);
		setIsPlaying(false);
	};

	const handlePrevious = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleNext = () => {
		if (currentStep < currentData.steps.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	};

	const getStepData = () => {
		if (currentData.steps.length === 0) return currentData;
		return currentData.steps[currentStep] || currentData;
	};

	const stepData = getStepData();

	const BarChart: React.FC<{
		data: number[];
		title: string;
		color: string;
		highlightedIndices?: number[];
		stepType?: string;
	}> = ({ data, title, color, highlightedIndices = [], stepType }) => (
		<div className="bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-700">
			<h3 className="text-sm font-semibold text-white mb-2 text-center">
				{title}
			</h3>
			<div className="flex items-end justify-center space-x-1 h-32">
				{data.map((value, index) => {
					const isHighlighted = highlightedIndices.includes(index);
					const barColor = isHighlighted
						? stepType === 'compare'
							? '#F59E0B'
							: stepType === 'swap'
							? '#EF4444'
							: stepType === 'merge'
							? '#8B5CF6'
							: stepType === 'partition'
							? '#06B6D4'
							: '#10B981'
						: color;

					return (
						<div
							key={index}
							className={`rounded-t transition-all duration-300 ease-in-out ${
								isHighlighted ? 'ring-1 ring-white shadow-md' : ''
							}`}
							style={{
								height: `${(value / maxValue) * 120}px`,
								width: `${Math.max(6, 80 / data.length)}px`,
								backgroundColor: barColor,
							}}
							title={`Index ${index}: ${value}`}
						/>
					);
				})}
			</div>
			<div className="mt-1 text-center text-xs text-gray-400">
				[{data.join(', ')}]
			</div>
		</div>
	);

	return (
		<div className="space-y-4">
			{/* Combined Visualization */}
			<div className="bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-700">
				<h3 className="text-lg font-semibold text-white mb-4 text-center">
					Algorithm Comparison
				</h3>

				<div className="grid grid-cols-2 gap-4">
					{/* Merge Sort */}
					<div>
						<h4 className="text-sm font-medium text-blue-400 mb-2 text-center">
							Merge Sort
						</h4>
						<div className="flex items-end justify-center space-x-1 h-32">
							{mergeSortData.array.map((value, index) => (
								<div
									key={index}
									className="bg-blue-500 rounded-t transition-all duration-300"
									style={{
										height: `${(value / maxValue) * 120}px`,
										width: `${Math.max(6, 80 / mergeSortData.array.length)}px`,
									}}
									title={`${value}`}
								/>
							))}
						</div>
						<div className="text-xs text-gray-400 text-center mt-2">
							Comparisons: {mergeSortData.comparisons} | Swaps:{' '}
							{mergeSortData.swaps}
						</div>
					</div>

					{/* Quick Sort */}
					<div>
						<h4 className="text-sm font-medium text-green-400 mb-2 text-center">
							Quick Sort
						</h4>
						<div className="flex items-end justify-center space-x-1 h-32">
							{quickSortData.array.map((value, index) => (
								<div
									key={index}
									className="bg-green-500 rounded-t transition-all duration-300"
									style={{
										height: `${(value / maxValue) * 120}px`,
										width: `${Math.max(6, 80 / quickSortData.array.length)}px`,
									}}
									title={`${value}`}
								/>
							))}
						</div>
						<div className="text-xs text-gray-400 text-center mt-2">
							Comparisons: {quickSortData.comparisons} | Swaps:{' '}
							{quickSortData.swaps}
						</div>
					</div>
				</div>
			</div>

			{/* Step-by-Step Visualization */}
			{isStepByStep && currentData.steps.length > 0 && (
				<div className="space-y-3">
					{/* Step Controls */}
					<div className="bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-700">
						<div className="flex items-center justify-between mb-3">
							<h3 className="text-sm font-semibold text-white">
								{activeAlgorithm === 'merge' ? 'Merge Sort' : 'Quick Sort'}{' '}
								Steps
							</h3>
							<div className="text-xs text-gray-400">
								{currentStep + 1}/{currentData.steps.length}
							</div>
						</div>

						<div className="flex items-center justify-center space-x-2">
							<button
								onClick={handlePrevious}
								disabled={currentStep === 0}
								className="px-2 py-1 bg-gray-700 text-white rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
							>
								←
							</button>

							<button
								onClick={handlePlay}
								className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
									isPlaying
										? 'bg-red-600 text-white hover:bg-red-700'
										: 'bg-green-600 text-white hover:bg-green-700'
								}`}
							>
								{isPlaying ? '⏸️' : '▶️'}
							</button>

							<button
								onClick={handleNext}
								disabled={currentStep >= currentData.steps.length - 1}
								className="px-2 py-1 bg-gray-700 text-white rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
							>
								→
							</button>

							<button
								onClick={handleReset}
								className="px-2 py-1 bg-gray-700 text-white rounded text-xs hover:bg-gray-600"
							>
								🔄
							</button>
						</div>

						{/* Progress Bar */}
						<div className="mt-2">
							<div className="w-full bg-gray-700 rounded-full h-1">
								<div
									className="bg-blue-500 h-1 rounded-full transition-all duration-300"
									style={{
										width: `${
											((currentStep + 1) / currentData.steps.length) * 100
										}%`,
									}}
								/>
							</div>
						</div>
					</div>

					{/* Current Step Visualization */}
					<BarChart
						data={stepData.array}
						title={`Step ${currentStep + 1}: ${stepData.description}`}
						color={activeAlgorithm === 'merge' ? '#3B82F6' : '#10B981'}
						highlightedIndices={stepData.highlightedIndices}
						stepType={stepData.stepType}
					/>
				</div>
			)}

			{/* Performance Summary */}
			<div className="bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-700">
				<h3 className="text-sm font-semibold text-white mb-3 text-center">
					Performance Summary
				</h3>

				<div className="grid grid-cols-2 gap-3">
					<div className="p-2 border border-blue-700 rounded bg-blue-900/20">
						<h4 className="text-xs font-medium text-blue-400 mb-1">
							Merge Sort
						</h4>
						<div className="text-xs space-y-0.5 text-gray-300">
							<div>Comparisons: {mergeSortData.comparisons}</div>
							<div>Swaps: {mergeSortData.swaps}</div>
							<div>Time: {mergeSortData.time.toFixed(2)}ms</div>
						</div>
					</div>
					<div className="p-2 border border-green-700 rounded bg-green-900/20">
						<h4 className="text-xs font-medium text-green-400 mb-1">
							Quick Sort
						</h4>
						<div className="text-xs space-y-0.5 text-gray-300">
							<div>Comparisons: {quickSortData.comparisons}</div>
							<div>Swaps: {quickSortData.swaps}</div>
							<div>Time: {quickSortData.time.toFixed(2)}ms</div>
						</div>
					</div>
				</div>

				{/* Winner */}
				<div className="mt-3 p-2 bg-gray-900/50 rounded text-center border border-gray-600">
					<div className="text-sm text-gray-300">
						{mergeSortData.time < quickSortData.time ? (
							<span className="text-blue-400 font-medium">
								🏆 Merge Sort is faster
							</span>
						) : mergeSortData.time > quickSortData.time ? (
							<span className="text-green-400 font-medium">
								🏆 Quick Sort is faster
							</span>
						) : (
							<span className="text-gray-400 font-medium">
								🤝 Both algorithms performed equally
							</span>
						)}
					</div>
				</div>
			</div>

			{/* Status */}
			{isAnimating && (
				<div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 text-center">
					<div className="text-yellow-400 font-medium">
						🔄 Running algorithms...
					</div>
				</div>
			)}
		</div>
	);
};
