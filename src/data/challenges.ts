import type { Challenge } from '@/types/game'

export const challenges: Challenge[] = [
  {
    id: 'reverse-string',
    title: 'Reverse a String',
    description: 'Write a function that reverses a string',
    difficulty: 'easy',
    xp: 50,
    completed: false,
    type: 'code',
    code: `function reverseString(str: string): string {
  // Your code here

}`,
    expectedOutput: 'olleh',
  },
  {
    id: 'fibonacci',
    title: 'Fibonacci Sequence',
    description: 'Generate the first n Fibonacci numbers',
    difficulty: 'medium',
    xp: 100,
    completed: false,
    type: 'code',
    code: `function fibonacci(n: number): number[] {
  // Your code here

}`,
    expectedOutput: '[0, 1, 1, 2, 3, 5, 8, 13]',
  },
  {
    id: 'palindrome',
    title: 'Palindrome Checker',
    description: 'Check if a string is a palindrome',
    difficulty: 'easy',
    xp: 50,
    completed: false,
    type: 'code',
    code: `function isPalindrome(str: string): boolean {
  // Your code here

}`,
    expectedOutput: 'true',
  },
  {
    id: 'two-sum',
    title: 'Two Sum',
    description: 'Find two numbers that add up to a target',
    difficulty: 'medium',
    xp: 100,
    completed: false,
    type: 'code',
    code: `function twoSum(nums: number[], target: number): number[] {
  // Your code here

}`,
    expectedOutput: '[0, 1]',
  },
  {
    id: 'typing-test',
    title: 'Typing Speed Test',
    description: 'Type the given text as fast as you can',
    difficulty: 'medium',
    xp: 75,
    completed: false,
    type: 'typing',
  },
  {
    id: 'tech-quiz',
    title: 'Technology Quiz',
    description: 'Answer questions about modern web development',
    difficulty: 'easy',
    xp: 50,
    completed: false,
    type: 'quiz',
  },
]
