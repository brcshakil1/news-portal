const handleCategories = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    const categories = data.data.news_category;
    
    const tabContainer = document.querySelector('.tab-container');
    categories.slice(0,3).forEach(category => {
        const a = document.createElement('a');
        a.innerHTML = `<a class="tab tab-lifted " onclick="handleCategory('${category.category_id}')">${category.category_name}</a> `;
        tabContainer.appendChild(a);
    });
}

const handleCategory = async(categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await res.json();
    const categoryItem = data.data;

    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = '';
    categoryItem.forEach(item=>{
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-full bg-base-100 shadow-xl p-4">
            <figure><img src=${item.image_url}/></figure>
            <div class="card-body">
                <div class="flex justify-between gap-4">
                <h2 class="card-title">${item.title.slice(0,35)}....</h2>
                <div class="card-actions justify-end">
                    <button class="btn btn-secondary rounded-[40px]">${item.rating.badge}</button>
                </div>
                </div>
            </div>
            <p class="pb-5">${item.details.slice(0, 60)}....</p>
            <p class="pb-5">Views: ${item.total_view > 0 ? item.total_view : 'No Views'}</p>
            <div class="flex justify-between items-center">
                <div class="flex gap-2.5 items-center">
                    <img class="rounded-[50%] w-20" src=${item.author.img} alt="">
                    <div>
                        <h3 class="text-base font-semibold">${item?.author?.name}</h3>
                        <p>${item?.author?.published_date}</p>
                    </div>
                </div>
                <div class="card-actions justify-end">
                    <button onclick="handleModal('${item._id}')" class="btn btn-primary bg-gray-800 border-none">Details</button>
                </div>
            </div>
        </div>
        `;
        cardContainer.appendChild(div)
    })
}

const handleModal = async(newsId) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
    const data = await res.json();
    console.log(data.data[0]);


    const modalContainer = document.querySelector('.modal-container');
    const div = document.createElement('div');
    div.innerHTML = `
    <dialog id="showDetails" class="modal">
    <form method="dialog" class="modal-box">
        <h3 class="font-bold text-lg">Hello!</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="modal-action">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
        </div>
    </form>
    </dialog>
    `;
    modalContainer.appendChild(div);

    const modal = document.querySelector('#showDetails');
    modal.showModal();
}

handleCategories();
handleCategory('01');