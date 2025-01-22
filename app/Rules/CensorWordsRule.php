<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CensorWordsRule implements ValidationRule
{
    protected array $censoredPatterns = [
        '/\bch+i+l+g+u+y+\b/i',
        '/\bch+i+l+ g+u+y+\b/i',       
        '/\bf+a+u+z+a+n+\b/i',        
        '/\bm+e+w+ c+o+i+n+\b/i',     
        '/\bm+e+w+c+o+i+n+\b/i',      
    ];
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        foreach ($this->censoredPatterns as $pattern) {
            if (preg_match($pattern, $value)) {
                $fail("The {$attribute} contains prohibited words: '{$value}'");
            }
        }
    }
}
