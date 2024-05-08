import React from 'react';
import { Button, Input } from '../lib/index';
// import '../lib/index.css';

export default function App() {
    return (
        <div className="w-full min-h-[100vh] p-5">
            <Button
                onClick={() => {
                    console.log('hi');
                }}
            >
                button
            </Button>
            <div className="h-10" />
            <Input type="text" />
            <Input type="file" />
        </div>
    );
}
