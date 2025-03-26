export default function AccountLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='grid w-full min-h-screen px-5 bg-slate-50 text-slate-950'>
			<main>{children}</main>
		</div>
	);
}
