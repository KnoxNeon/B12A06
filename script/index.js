const loadCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res)=> res.json())
    .then((json)=> displayCategory(json.categories));
}

const loadTrees = (id) => {
    
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
    .then((res)=> res.json())
    .then((data)=> displayCategoryTrees(data.plants));
}

const displayCategoryTrees = (trees) => {
    const catTree = document.getElementById("catTree-container")
    catTree.innerHTML = "";

    for(let tree of trees){
        console.log(tree)
        const treeDiv = document.createElement("div");
        
        treeDiv.innerHTML = `
        <div class="card p-5 bg-white space-y-3 min-h-[450px] ">
        <img src="${tree.image}" class="w-full h-50 rounded-lg" alt="">
                   <h3 class="text-base font-semibold text-left">${tree.name}</h3>
                   <p class="text-sm opacity-80 text-left">${tree.description}</p>
                   <div class="flex justify-between">
                    <h3 class="text-sm bg-[#DCFCE7] rounded-xl p-1 text-[#15803D]">${tree.category}</h3>
                    <h3 class="font-semibold">$${tree.price}</h3>
                   </div>  
                   <button class="bg-[#15803D] text-white text-base font-medium w-full rounded-3xl py-1">Add to Cart</button>
                   </div>
        `;
        catTree.append(treeDiv);
    }
}


const displayCategory = (categories) => {
    const categoryContainer = document.getElementById("category-container");
    categoryContainer.innerHTML = "";

    for(let category of categories){
        const catDiv = document.createElement("div");
        
        catDiv.innerHTML = `
        
        <button onclick="loadTrees(${category.id})" class="bg-[#F0FDF4] w-full ml-10 p-1 text-left font-medium text-base rounded-md">${category.category_name}s</button>
        `;
        categoryContainer.append(catDiv);
    }
}

loadCategories();