import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'OUV Trajes',
    description: 'Seu site para compra de camisas de time',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-br">
            <body>{children}</body>
        </html>
    );
}
