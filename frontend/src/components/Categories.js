import { useGetCategories } from "../hooks/useGetCategories"

const Categories = ({onSelectCategory, setcatname}) => {

    const {categories, loading, handleCategoryDropDown} = useGetCategories();

    const handleClick = async (e) =>{
        e.preventDefault();

        await handleCategoryDropDown();
    }

  return (
    <div className="dropdown categories">
        <button type="button" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleClick}>Categories</button>
        <ul className="dropdown-menu">
            <li onClick={()=>{onSelectCategory(""); setcatname("");}}><button type="button" className="dropdown-item text-start">All Categories</button></li>
            {loading && <li><span className="dropdown-item-text text-muted">Loading...</span></li>}
            {!loading && categories.length < 1 && <li><span className="dropdown-item-text text-muted">No categories available</span></li>}
            {!loading && categories.length > 0 && <li><hr className="dropdown-divider" /></li>}
            {!loading && categories.length > 0 && (
                categories.map((cat) => (
                    <li key={cat._id} onClick={()=>{onSelectCategory(cat._id); setcatname(cat.Category);}}>
                        {/* <Link to={`/category/${cat._id}`} className="dropdown-item">{cat.Category}</Link> */}
                        <button type="button" className="dropdown-item text-start">{cat.Category}</button>
                    </li>
                ))
            )} 
        </ul>
    </div>
  )
}

export default Categories