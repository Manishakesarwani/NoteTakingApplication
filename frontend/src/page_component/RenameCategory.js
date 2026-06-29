import { useRenameCategory } from "../hooks/useRenameCategory";

const RenameCategory = ({catname, setcatname, setisediting, activeCategory, handleGetNotes, tempname}) => {

    const {loading, handleRenameCategory} = useRenameCategory();

    const handleCancel = (e) => {
        e.preventDefault();
        setcatname(tempname);
        setisediting(false);
    }

    const renameCategory = async(e)=> {
        e.preventDefault();
        const isSuccess = await handleRenameCategory(activeCategory, catname);
        if(isSuccess){
            setcatname(catname);
            setisediting(false);
            await handleGetNotes(activeCategory);
        }
        // console.log("catname",catname)
    }

  return (
    <div className="rename_category">
        <form>
            <div>
                <input type="text" id="catname" name="catname" value={catname} onChange={(e)=>setcatname(e.target.value)} autoFocus />
            </div>
            <div className="navigation_buttons">
                <button type="button" onClick={renameCategory} disabled={loading} className="update_cat">{loading ? "Updating" : "Update"}</button>
                <button type="button" onClick={handleCancel} className="cancel">Cancel</button>
            </div>
        </form>
    </div>
  )
}

export default RenameCategory