import { ProductFlexView } from "@/frontend/components/product-flex-view"
import SearchFilters from "@/frontend/components/search-filters";

export default function Search({ params }) {
    const search = params.query;

    const decodedSearch = decodeURIComponent(search);

    const searchParams = decodedSearch.split('&').reduce((acc, current) => {
        const [key, value] = current.split('=');
        acc[key] = value;
        return acc;
    }, {});
    console.log('search params');
    console.log(searchParams);
    return(
        <>
        
        <ProductFlexView textFilter={searchParams.title} categoryFilter={searchParams.category} title={searchParams.pageTitle} />
        </>
    )
}