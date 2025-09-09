const loadCategories = async () =>{
    const res = await fetch("https://openapi.programming-hero.com/api/categories")
    const data = await res.json();
        displayCategory(data.categories)
    
}

const removeActive = () =>{
    const categoryButtons = document.querySelectorAll(".category-btn");
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
};


const loadTrees = async(id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    const res = await fetch(url)
    const data = await res.json()
        removeActive();
        const clickedBtn = document.getElementById(`category-${id}`)
        clickedBtn.classList.add("active")
       displayTrees(data.plants)
    }
    


const loadAllTrees = async() => {
    const url = "https://openapi.programming-hero.com/api/plants"
    const res = await fetch(url);
    const data = await res.json();
        removeActive();
        const clickedAllbtn = document.getElementById("category-all")
        clickedAllbtn.classList.add("active")
        displayTrees(data.plants)
    }

let totalPrice = 0;

const addToCart = async (id) =>{
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    const res = await fetch(url)
    const data = await res.json()

    totalPrice = totalPrice + data.plants.price;

    const allPrice = document.getElementById("cart-container")

        const priceDiv = document.createElement("div");
        
        priceDiv.innerHTML = `
                <div class="addToCart bg-[#F0FDF4] rounded-lg mx-2 py-2 px-4 flex justify-between items-center">
                  <div class="flex flex-col gap-2 font-semibold text-base text-left">
                  <h3>${data.plants.name}</h3>
                  <p class="text-[#577094] text-sm font-normal">৳ ${data.plants.price} × 1</p>
                  </div>
                  <i class="fa-solid fa-xmark cursor-pointer"></i>
                </div>
        `;

        allPrice.append(priceDiv);

        const xPrice = priceDiv.querySelector(".fa-xmark");

        xPrice.addEventListener("click", ()=>{
            priceDiv.remove()
            totalPrice = totalPrice - data.plants.price;
            document.getElementById("total-price").innerText = `৳${totalPrice}`

        })

        document.getElementById("total-price").innerText = `৳${totalPrice}`
}


const displayTrees = (trees) => {
    const allTree = document.getElementById("tree-container")
    allTree.innerHTML = "";

    for(let tree of trees){
        const treeDiv = document.createElement("div");
        
        treeDiv.innerHTML = `
        <div class="card p-5 bg-white space-y-3 min-h-[480px] plants mx-auto justify-center space-x-5 ">
        <img src="${tree.image}" class="w-full h-50 rounded-lg md:object-cover" alt="">
                   <h3 class="text-base font-semibold text-left">${tree.name}</h3>
                   <p class="text-sm opacity-80 text-left">${tree.description}</p>
                   <div class="flex justify-between">
                    <h3 class="text-sm bg-[#DCFCE7] rounded-xl p-1 text-[#15803D]">${tree.category}</h3>
                    <h3 class="font-semibold">৳${tree.price}</h3>
                   </div>  
                   <button onclick="addToCart(${tree.id})" class="bg-[#15803D] text-white text-base font-medium w-full rounded-3xl py-1 cursor-pointer">Add to Cart</button>
                   </div>
        `;
        allTree.append(treeDiv);
    }
}


const displayCategory = (categories) => {
    const categoryContainer = document.getElementById("category-container");
    categoryContainer.innerHTML = "";

    const allBtn = document.createElement("div");
    allBtn.innerHTML = `
         <button id="category-all"  onclick="loadAllTrees()" class="bg-white active w-full grid justify-center md:justify-start md:ml-5 p-1 text-left font-medium text-base rounded-md category-btn cursor-pointer">All Plants</button>
    `;
    categoryContainer.append(allBtn);

    for(let category of categories){
        const catDiv = document.createElement("div");
        
        catDiv.innerHTML = `
        
        <button id="category-${category.id}" onclick="loadTrees(${category.id})" class="bg-white  w-full grid justify-center md:justify-start md:ml-5 p-1 text-left font-medium text-base rounded-md category-btn cursor-pointer">${category.category_name}s</button>
        `;
        categoryContainer.append(catDiv);
    }
}

loadAllTrees();
loadCategories();
