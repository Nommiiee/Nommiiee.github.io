const navigationPanel = ` <div class="" id="nav">
<nav class="w-full h-screen absolute top-0 bg-slate-900 -translate-x-full  transtition-all duration-500 lg:sticky lg:-translate-x-0 lg:h-min"
    id="navigation">
    <div class=" flex flex-col lg:flex-row  text-white w-full">
        <button
            class="w-full text-center border-2 border-white text-lg font-medium hover:bg-black transtition-all duration-300 text-white p-2 menu-btn lg:hidden">
            Close
        </button>
        <a class="p-4 border-b-2 border-white w-full flex item-center gap-2 hover:bg-amber-500 hover:text-black hover:border-amber-500 font-medium transtition-all duration-500 lg:justify-center"
            href="../../">
            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
            </span>
            <span>VRChive</span>
        </a>
        <a class="p-4 border-b-2 border-white w-full flex item-center gap-2 hover:bg-amber-500 hover:text-black hover:border-amber-500 font-medium transtition-all duration-500 lg:justify-center"
            href="../vr-assets/">
            <span class="lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
            </span>
            <span>Assets</span>
        </a>
        <a class="p-4 border-b-2 border-white w-full flex item-center gap-2 hover:bg-amber-500 hover:text-black hover:border-amber-500 font-medium transtition-all duration-500 lg:justify-center"
            href="../avatars/">
            <span class="lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
            </span>
            <span>Avatar</span>
        </a>
        <a class="p-4 border-b-2 border-white w-full flex item-center gap-2 hover:bg-amber-500 hover:text-black hover:border-amber-500 font-medium transtition-all duration-500 lg:justify-center"
            href="../clothes/">
            <span class="lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
            </span>
            <span>Clothing</span>
        </a>
        <a class="p-4 border-b-2 border-white w-full flex item-center gap-2 hover:bg-amber-500 hover:text-black hover:border-amber-500 font-medium transtition-all duration-500 lg:justify-center"
            href="../shaders/">
            <span class="lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
            </span>
            <span>Shaders</span>
        </a>
        <a class="p-4 border-b-2 border-white w-full flex item-center gap-2 hover:bg-amber-500 hover:text-black hover:border-amber-500 font-medium transtition-all duration-500 lg:justify-center"
            href="../textures/">
            <span class="lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
            </span>
            <span>Textures</span>
        </a>
    </div>
</nav>
<button
    class="w-full border-2 border-white text-lg font-medium hover:bg-black transtition-all duration-300 text-white p-2 menu-btn lg:hidden">
    Menu
</button>
</div>`;

const navContainer = document.getElementById("nav-container");
navContainer.innerHTML = navigationPanel;

if (document.title == "Avatar Repo :: HomePage") {
} else {
  const mainSection = document.getElementById("main-section");
  const searchBar = ` <div class="serach py-4 w-full flex items-center justify-center px-4"><div class="w-full"><input class="py-2 px-4 rounded-sm shadow-sm  text-lg font-medium bg-gray-100 text-gray-800 w-full focus:outline-none"
type="text" placeholder="search" oninput="filterAvatars(this.value)"></div></div>`;

  mainSection.innerHTML = searchBar + mainSection.innerHTML;
  function filterAvatars(str) {
    const avatarName = document.querySelectorAll(".productName");
    avatarName.forEach((name) => {
      console.log(name);
      if (name.textContent.toLowerCase().includes(str.toLowerCase())) {
        name.parentElement.parentElement.style.display = "block";
      } else {
        name.parentElement.parentElement.style.display = "none";
      }
    });
  }
}

const menuBtn = document.querySelectorAll(".menu-btn");
const navigation = document.querySelector("#navigation");

menuBtn.forEach((btn) => {
  console.log("Menu Loaded");
  btn.addEventListener("click", () => {
    navigation.classList.toggle("-translate-x-full");
    console.log("Menu Button Clicked");
  });
});

async function getData(URL) {
  return fetch(URL)
    .then((res) => res.json())
    .then((data) => data);
}

function backToTop() {
  // smooth scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function copyIdToClipboard(element) {
  const ID = element.parentElement.id;
  const itemName =
    element.parentElement.parentElement.querySelector(".item-name").textContent;

  if (ID == "") {
    alert("This item has no ID");
    return;
  } else {
    navigator.clipboard.writeText(ID);
    alert(`Copied ${itemName} ID to clipboard`);
  }
}
