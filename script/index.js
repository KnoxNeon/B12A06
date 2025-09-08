const loadCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res)=> res.json())
    .then((json)=> displayCategory(json.categories));
}

const displayCategory = (categories) => {
    const categoryContainer = document.getElementById("category-container");
    categoryContainer.innerHTML = "";
    console.log(categories)

    for(let category of categories){
        const catDiv = document.createElement("div");
        
        catDiv.innerHTML = `
        <button class="bg-[#F0FDF4] w-full text-left font-semibold text-base ml-10 p-1 rounded-md">${category.category_name}s</button>
        `;
        categoryContainer.append(catDiv)
    }
}

loadCategories();