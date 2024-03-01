import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
const Sidebar = () => {
var hideScrollbarTimeout;
function show(){
  clearTimeout(hideScrollbarTimeout);
  var scrollableContent = document.getElementById('scrollableSibar');
  scrollableContent.classList.remove("hidden-scrollbar")
  scrollableContent.classList.add("scrollbar")
  
}

function hide(){
  hideScrollbarTimeout = setTimeout(function() {
    var scrollableContent = document.getElementById('scrollableSibar');
    scrollableContent.classList.remove("scrollbar")
    scrollableContent.classList.add('hidden-scrollbar'); // Hide the scrollbar after a delay
  }, 1000);
}
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col md:min-w-[350px]" >
      <SearchInput />
      <div
        id="scrollableSibar"
        className="scrollbar"
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        <Conversations />
      </div>
      <LogoutButton />
    </div>
  );
};
export default Sidebar;
