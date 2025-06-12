// app/productdetail1/[id]/page.tsx
import ProductDetailClientPage from './ProductDetailClientPage';

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return <ProductDetailClientPage id={params.id} />;
}