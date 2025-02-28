'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ClientTestPage() {
	const [clientTime, setClientTime] = useState<string>('Loading...');
	const [counter, setCounter] = useState<number>(0);
	
	useEffect(() => {
		// This will only run in the browser
		setClientTime(new Date().toISOString());
	}, []);
	
	return (
		<div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
			<h1>Client Test Page (CSR)</h1>
			
			<div style={{ margin: '2rem 0', padding: '1rem', border: '1px solid #eaeaea', borderRadius: '5px' }}>
				<h2>Client-Side Rendering Test</h2>
				<p>This page uses the 'use client' directive and includes interactive elements.</p>
				<p style={{ fontWeight: 'bold', marginTop: '1rem' }}>
					Client time: {clientTime}
				</p>
				
				<div style={{ marginTop: '2rem' }}>
					<p>Counter: {counter}</p>
					<button 
						onClick={() => setCounter(prev => prev + 1)}
						style={{
							marginTop: '0.5rem',
							padding: '0.5rem 1rem',
							backgroundColor: '#0070f3',
							color: 'white',
							border: 'none',
							borderRadius: '5px',
							cursor: 'pointer'
						}}
					>
						Increment Counter
					</button>
				</div>
				
				<p style={{ marginTop: '1rem' }}>
					The counter state is managed client-side and will reset on page refresh.
				</p>
			</div>
			
			<Link href="/" style={{ color: '#0070f3', textDecoration: 'underline' }}>
				&larr; Back to Home
			</Link>
		</div>
	);
} 