/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFriendlyErrorMessage(error: unknown, context: string): string {
    let rawMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
        rawMessage = error.message;
    } else if (typeof error === 'string') {
        rawMessage = error;
    } else if (error) {
        rawMessage = String(error);
    }

    // API key / auth issues
    if (rawMessage.includes('API key not valid') || rawMessage.includes('API_KEY_INVALID') || rawMessage.includes('invalid api key')) {
        return `${context}. Your Gemini API key is invalid. Update GEMINI_API_KEY in your .env or .env.local file, then restart the dev server. Get a key from Google AI Studio: https://aistudio.google.com/app/apikey`;
    }

    if (rawMessage.includes('PERMISSION_DENIED') || rawMessage.includes('permission denied')) {
        return `${context}. The API key does not have permission to use the Generative Language API. Ensure the key is from Google AI Studio and not restricted in a way that blocks localhost.`;
    }

    if (rawMessage.includes('quota') || rawMessage.includes('429')) {
        return `${context}. Rate limit or quota exceeded. Please wait a moment and try again.`;
    }

    // Check for specific unsupported MIME type error from Gemini API
    if (rawMessage.includes("Unsupported MIME type")) {
        try {
            // It might be a JSON string like '{"error":{"message":"..."}}'
            const errorJson = JSON.parse(rawMessage);
            const nestedMessage = errorJson?.error?.message;
            if (nestedMessage && nestedMessage.includes("Unsupported MIME type")) {
                const mimeType = nestedMessage.split(': ')[1] || 'unsupported';
                return `File type '${mimeType}' is not supported. Please use a format like PNG, JPEG, or WEBP.`;
            }
        } catch (e) {
            // Not a JSON string, but contains the text. Fallthrough to generic message.
        }
        // Generic fallback for any "Unsupported MIME type" error
        return `Unsupported file format. Please upload an image format like PNG, JPEG, or WEBP.`;
    }
    
    return `${context}. ${rawMessage}`;
}