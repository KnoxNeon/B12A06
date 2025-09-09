const loadCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res)=> res.json())
    .then((json)=>
        displayCategory(json.categories)
    );
}

const removeActive = () =>{
    const categoryButtons = document.querySelectorAll(".category-btn");
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
};


const loadTrees = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
    .then((res)=> res.json())
    .then((data)=> {
        removeActive();
        const clickedBtn = document.getElementById(`category-${id}`)
        clickedBtn.classList.add("active")
       displayTrees(data.plants)}
    );
}

const loadAllTrees = () => {
    const url = "https://openapi.programming-hero.com/api/plants"
    fetch(url)
    .then((res)=> res.json())
    .then((data)=> {
        removeActive();
        const clickedAllbtn = document.getElementById("category-all")
        clickedAllbtn.classList.add("active")
        displayTrees(data.plants)
    })
    
}

const displayTrees = (trees) => {
    const allTree = document.getElementById("tree-container")
    allTree.innerHTML = "";

    for(let tree of trees){
        console.log(tree)
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
                   <button class="bg-[#15803D] text-white text-base font-medium w-full rounded-3xl py-1">Add to Cart</button>
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
         <button id="category-all"  onclick="loadAllTrees()" class="bg-white active w-full grid justify-center md:justify-start md:ml-5 p-1 text-left font-medium text-base rounded-md category-btn">All Plants</button>
    `;
    categoryContainer.append(allBtn);

    for(let category of categories){
        const catDiv = document.createElement("div");
        
        catDiv.innerHTML = `
        
        <button id="category-${category.id}" onclick="loadTrees(${category.id})" class="bg-white  w-full grid justify-center md:justify-start md:ml-5 p-1 text-left font-medium text-base rounded-md category-btn">${category.category_name}s</button>
        `;
        categoryContainer.append(catDiv);
    }
}

loadAllTrees()
loadCategories();
