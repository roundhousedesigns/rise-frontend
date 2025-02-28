import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<h1>RISE Theatre Directory</h1>
			<h2>Next.js Migration Test</h2>
			
			<div className={styles.links}>
				<Link href="/partners" className={styles.card}>
					<h3>Partners Page (SSR) &rarr;</h3>
					<p>Visit the server-side rendered partners page.</p>
				</Link>

				<Link href="/dashboard" className={styles.card}>
					<h3>Dashboard (Protected) &rarr;</h3>
					<p>Visit the protected dashboard page (requires login).</p>
				</Link>

				<Link href="/login" className={styles.card}>
					<h3>Login &rarr;</h3>
					<p>Go to the login page.</p>
				</Link>

				<Link href="/client-test" className={styles.card}>
					<h3>Client-Side Test &rarr;</h3>
					<p>Visit a simple client-side rendered test page.</p>
				</Link>
			</div>
		</div>
	);
} 