import React from 'react';
import { Button } from '../lib/index';

export default function App() {
    return (
        <div>
            <Button
                size="sm"
                onClick={() => {
                    console.log('hi');
                }}
            >
                button
            </Button>
        </div>
    );
}
