export default function AccountLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='grid w-full min-h-screen px-5 bg-white'>
			<main className=' py-28'>{children}</main>
		</div>
	);
}
