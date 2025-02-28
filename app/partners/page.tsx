import Link from 'next/link';

// Sample partner data - in a real app, this would come from an API or database
const partners = [
	{
		id: 1,
		name: 'Broadway Theatre Alliance',
		description: 'A coalition of Broadway theatres promoting diversity and inclusion in the performing arts.',
		location: 'New York, NY',
		website: 'https://example.com/bta',
	},
	{
		id: 2,
		name: 'West End Theatre Collective',
		description: 'Supporting emerging playwrights and directors in London\'s theatre scene.',
		location: 'London, UK',
		website: 'https://example.com/wetc',
	},
	{
		id: 3,
		name: 'Regional Theatre Network',
		description: 'Connecting regional theatres across the country to share resources and talent.',
		location: 'Chicago, IL',
		website: 'https://example.com/rtn',
	},
];

// This is a Server Component by default (no 'use client' directive)
export default async function PartnersPage() {
	// This will run on the server
	const serverTime = new Date().toISOString();
	
	return (
		<div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
			<h1 style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>Our Theatre Partners</h1>
			
			<div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #eaeaea', borderRadius: '5px', background: '#f9f9f9' }}>
				<p>This page is server-rendered. The time below was generated on the server:</p>
				<p style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>
					Server time: {serverTime}
				</p>
			</div>
			
			<div>
				{partners.map(partner => (
					<div key={partner.id} style={{ marginBottom: '1.5rem', padding: '1.5rem', border: '1px solid #eaeaea', borderRadius: '5px' }}>
						<h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>{partner.name}</h2>
						<p style={{ marginBottom: '0.5rem', color: '#666' }}>{partner.description}</p>
						<p style={{ marginBottom: '0.5rem' }}><strong>Location:</strong> {partner.location}</p>
						<a href={partner.website} target="_blank" rel="noopener noreferrer" style={{ color: '#0070f3', textDecoration: 'underline' }}>
							Visit Website
						</a>
					</div>
				))}
			</div>
			
			<Link href="/" style={{ display: 'inline-block', marginTop: '2rem', color: '#0070f3', textDecoration: 'underline' }}>
				&larr; Back to Home
			</Link>
		</div>
	);
} 