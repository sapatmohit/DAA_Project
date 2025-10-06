'use client';

import React, { useState } from 'react';
import { SortingData } from './SortingVisualizer';

interface AlgorithmCodeProps {
	language: 'c' | 'cpp' | 'java';
	mergeSortData: SortingData;
	quickSortData: SortingData;
}

export const AlgorithmCode: React.FC<AlgorithmCodeProps> = ({
	language,
	mergeSortData,
	quickSortData,
}) => {
	const [activeTab, setActiveTab] = useState<'merge' | 'quick'>('merge');

	const codeSnippets = {
		c: {
			merge: `// Merge Sort in C
void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    int L[n1], R[n2];
    
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}`,
			quick: `// Quick Sort in C
int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] <= pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
    return (i + 1);
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
		},
		cpp: {
			merge: `// Merge Sort in C++
void merge(vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    vector<int> L(n1), R(n2);
    
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}`,
			quick: `// Quick Sort in C++
int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
		},
		java: {
			merge: `// Merge Sort in Java
public static void merge(int[] arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    int[] L = new int[n1];
    int[] R = new int[n2];
    
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

public static void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}`,
			quick: `// Quick Sort in Java
public static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] <= pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
    return (i + 1);
}

public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
		},
	};

	const getLanguageName = (lang: string) => {
		switch (lang) {
			case 'c':
				return 'C';
			case 'cpp':
				return 'C++';
			case 'java':
				return 'Java';
			default:
				return 'C';
		}
	};

	const renderHighlightedCode = (code: string, lang: string) => {
		const lines = code.split('\n');
		
		return lines.map((line, lineIndex) => {
			const highlightedLine = highlightLine(line, lang);
			return (
				<div key={lineIndex} className="leading-relaxed">
					{highlightedLine}
				</div>
			);
		});
	};

	const highlightLine = (line: string, lang: string) => {
		// Common keywords for all languages
		const commonKeywords = ['if', 'else', 'for', 'while', 'return', 'const', 'static', 'void', 'int', 'char', 'float', 'double', 'bool'];
		
		// Language-specific keywords
		const keywords = {
			c: [...commonKeywords, 'include', 'define', 'typedef', 'struct', 'union', 'enum'],
			cpp: [...commonKeywords, 'include', 'define', 'typedef', 'struct', 'union', 'enum', 'class', 'public', 'private', 'protected', 'namespace', 'using', 'std', 'vector', 'swap'],
			java: [...commonKeywords, 'public', 'private', 'protected', 'class', 'static', 'import', 'package', 'new', 'this', 'super', 'extends', 'implements']
		};

		const langKeywords = keywords[lang] || keywords.c;
		
		// Split line into tokens
		const tokens = line.split(/(\s+|[{}();,=<>!&|+\-*/])/);
		
		return tokens.map((token, tokenIndex) => {
			const trimmedToken = token.trim();
			
			// Comments
			if (trimmedToken.startsWith('//') || trimmedToken.startsWith('/*') || trimmedToken.startsWith('*')) {
				return <span key={tokenIndex} className="text-green-500">{token}</span>;
			}
			
			// Strings
			if ((trimmedToken.startsWith('"') && trimmedToken.endsWith('"')) || 
				(trimmedToken.startsWith("'") && trimmedToken.endsWith("'"))) {
				return <span key={tokenIndex} className="text-yellow-400">{token}</span>;
			}
			
			// Keywords
			if (langKeywords.includes(trimmedToken)) {
				return <span key={tokenIndex} className="text-blue-400 font-semibold">{token}</span>;
			}
			
			// Numbers
			if (/^\d+$/.test(trimmedToken)) {
				return <span key={tokenIndex} className="text-purple-400">{token}</span>;
			}
			
			// Function names (words followed by parentheses)
			if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(trimmedToken) && 
				tokens[tokenIndex + 1] === '(') {
				return <span key={tokenIndex} className="text-cyan-400">{token}</span>;
			}
			
			// Variables (words that are not keywords)
			if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(trimmedToken)) {
				return <span key={tokenIndex} className="text-orange-400">{token}</span>;
			}
			
			// Operators and punctuation
			if (/[{}();,=<>!&|+\-*/]/.test(token)) {
				return <span key={tokenIndex} className="text-gray-400">{token}</span>;
			}
			
			// Default
			return <span key={tokenIndex} className="text-gray-300">{token}</span>;
		});
	};

	return (
		<div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
			<div className="p-4 border-b border-gray-700">
				<h2 className="text-xl font-semibold text-white">
					Algorithm Implementation - {getLanguageName(language)}
				</h2>
			</div>

			{/* Tab Navigation */}
			<div className="flex border-b border-gray-700">
				<button
					onClick={() => setActiveTab('merge')}
					className={`px-4 py-2 text-sm font-medium ${
						activeTab === 'merge'
							? 'text-blue-400 border-b-2 border-blue-400 bg-blue-900/30'
							: 'text-gray-400 hover:text-gray-300'
					}`}
				>
					Merge Sort
				</button>
				<button
					onClick={() => setActiveTab('quick')}
					className={`px-4 py-2 text-sm font-medium ${
						activeTab === 'quick'
							? 'text-blue-400 border-b-2 border-blue-400 bg-blue-900/30'
							: 'text-gray-400 hover:text-gray-300'
					}`}
				>
					Quick Sort
				</button>
			</div>

      {/* Code Display */}
      <div className="p-4">
        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm font-mono">
          <code className="text-gray-300">
            {renderHighlightedCode(codeSnippets[language][activeTab], language)}
          </code>
        </pre>
      </div>

			{/* Performance Stats */}
			<div className="p-4 border-t border-gray-700 bg-gray-900/50">
				<div className="grid grid-cols-2 gap-4">
					<div className="text-center">
						<h3 className="text-sm font-medium text-gray-300 mb-2">
							Merge Sort
						</h3>
						<div className="space-y-1 text-xs text-gray-400">
							<div>Comparisons: {mergeSortData.comparisons}</div>
							<div>Swaps: {mergeSortData.swaps}</div>
							<div>Time: {mergeSortData.time.toFixed(2)}ms</div>
						</div>
					</div>
					<div className="text-center">
						<h3 className="text-sm font-medium text-gray-300 mb-2">
							Quick Sort
						</h3>
						<div className="space-y-1 text-xs text-gray-400">
							<div>Comparisons: {quickSortData.comparisons}</div>
							<div>Swaps: {quickSortData.swaps}</div>
							<div>Time: {quickSortData.time.toFixed(2)}ms</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
