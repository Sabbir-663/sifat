
const loadCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then((res)=> res.json())
    .then((data)=>displayButton(data.categories))

    .catch((error)=> console.log(error))
    
      
 }

 loadCategories();



const displayButton=(categories)=>{

    const categoryContainer=document.getElementById('button-container')
 
    categories.forEach((item)=> {
       
        // create button
        const buttonContainer=document.createElement("div")
    buttonContainer.innerHTML=`
     <button  onclick="loadDetails('${item.category}')" class="flex bg-white text-2xl justify-center items-center border hover:border-2 hover:border-blue-500 hover:rounded-full hover:bg-[#E7F2F2] gap-2 px-12 py-4 rounded-lg font-bold w-full ">
        <div>
        <img class="w-[32px]" src="${item.category_icon}" alt="">
        </div>${item.category}
        </button>
    `
      



        // add button

        categoryContainer.append(buttonContainer)
      })
    }




    const loadCards = () =>{
    let petData = [];

        const sortButton = document.getElementById("sort-btn").addEventListener('click',()=> {
            const sortData = [...petData].sort((a,b)=>b?.price-a?.price) ;

            
           
           displayCards(sortData);
        })
       
        const loadingPhase = document.getElementById("loading")
        const displayCardContainer = document.getElementById("cards-container");
            displayCardContainer.classList.add("hidden")
        loadingPhase.classList.remove("hidden");
        fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then((res) => res.json())
        .then((data) => {
          setTimeout(() => {
            displayCardContainer.classList.remove("hidden")  
            spinner.classList.add("hidden")
            petData = data.pets
            displayCards(data.pets)
            },2000)
          })
        .catch((error)=> console.log(error))
        
        
     }

// // card create
// const loadCards = () => {
//     let petCard = [];
//     const sortButton = document.getElementById("sort-btn").addEventListener('click', () => {
//         const cardSort = [...petCard].sort((a, b) => b.price - a.price)

//         displayCardsLoad(cardSort)
//     })

//     const spinner = document.getElementById("loading-spinner");
//     const displayCardContainer = document.getElementById("card-container");
//     displayCardContainer.classList.add("hidden")
//     spinner.classList.remove("hidden");
//     fetch('https://openapi.programming-hero.com/api/peddy/pets')
//         .then((res) => res.json())
//         .then((data) => {
//           setTimeout(() => {
//             displayCardContainer.classList.remove("hidden")
//             spinner.classList.add("hidden")
//              petCard = data.pets
            // displayCardsLoad(data.pets)

//           },2000)  



     loadCards();
     
     const loadDetails =(petName)=>{
        const loadingPhase = document.getElementById("loading")
        const displayCardContainer = document.getElementById("cards-container");
    displayCardContainer.classList.add("hidden")
       
        loadingPhase.classList.remove("hidden"); 
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${petName}`)
    .then((res)=> res.json())
    .then((data)=> {
        
        setTimeout(()=>{
                
            // Hide the loading spinner once data is fetched
            displayCardContainer.classList.remove("hidden")
            loadingPhase.classList.add("hidden");
            displayCards(data.data);
            },2000)
    })
    .catch((error)=> console.log(error))
}


loadDetails();

    //  {
    //     "status": true,
    //     "message": "successfully fetched all the pets data",
    //     "pets": [
    //       {
    //         "petId": 1,
    //         "breed": "Golden Retriever",
    //         "category": "Dog",
    //         "date_of_birth": "2023-01-15",
    //         "price": 1200,
    //         "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
    //         "gender": "Male",
    //         "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
    //         "vaccinated_status": "Fully",
    //         "pet_name": "Sunny"
    //       },

     const displayCards =(pets)=>{
        const cardContainer=document.getElementById('cards-container')
        cardContainer.innerHTML="";
        if(pets.length == 0){
            cardContainer.classList.remove("grid")
            cardContainer.innerHTML=`
          <div class="min-h-[350px] w-full mx-auto flex flex-col gap-5 justify-center items-center bg-[#F8F8F8] rounded-xl">
            <img src="images/error.webp" alt="">
            <h1 class="text-center text-3xl font-bold">No Information Available</h1>
            <p class="text-center text-lg font-bold">No pet information is available at the moment. Please check back later for any latest updates.</p>
        </div>
            `;
            return ;
        }
        else{
            cardContainer.classList.add("grid")
        }
        
        pets.forEach((singlePet) =>{
            const allCards=document.createElement("div")
            allCards.innerHTML=`
            
              <div class=" border border-slate-200 p-3 rounded-md">
            <div class=" ">
              <img class="h-full md:w-full  rounded-md"
                src="${singlePet.image}"
                alt="" />
            </div>
            <div class="">
            <div>
                <p class="md:text-md text-sm font-bold md:mt-3">${singlePet.pet_name}</p>
            </div>
            <div class="flex gap-1 align-center mb-1">
                <img class="w-4 md:w-6" src="https://img.icons8.com/?size=80&id=67667&format=png" alt="">
                ${singlePet.breed ? `<p class="text-xs md:text-sm font-semibold">Breed:${singlePet.breed}</p>`:`<p class="text-xs md:text-sm font-semibold">Breed: Not Available</p>`}
            </div>
            
            <div class="flex gap-1 align-center mb-1">
                <img class="w-4 md:w-6" src="https://img.icons8.com/?size=80&id=fXgL1AuZbbYX&format=png" alt="">
                ${singlePet.date_of_birth ? `<p class="text-xs md:text-sm font-semibold">Date of Birth:${singlePet.date_of_birth}</p>`:`<p class="text-xs md:text-sm font-semibold"> Date-of-birth: Not Available</p>`}
            </div>
            
            <div class="flex gap-1 align-center mb-1">
                <img class="w-4 md:w-6" src="https://img.icons8.com/?size=80&id=70834&format=png" alt="">
                ${singlePet.gender ? `<p class="text-xs md:text-sm font-semibold">Gender:${singlePet.gender}</p>`:`<p class="text-xs md:text-sm font-semibold">Gender: Not Available</p>`}
            </div>
            
            <div class="flex gap-1 align-center mb-1">
                <img class="w-4 md:w-6" src="https://img.icons8.com/?size=24&id=85801&format=png" alt="">
                ${singlePet.price ? `<p class="text-xs md:text-sm font-semibold">Price:${singlePet.price}</p>`:`<p class="text-xs md:text-sm font-semibold">Price: Not Available</p>`}
            </div>
            
            </div>
            </div>
            
            <hr>
            <br>
<!-- buttons div -->
            <div class="flex justify-between px-3">
                <div>
                  <button onclick="likedImage('${singlePet.image}')" class="border border-[#0E7A81] pt-1 pb-2 px-3 rounded-md hover:bg-green-300">
                    <img class=" w-4" src="https://img.icons8.com/?size=64&id=66627&format=png" alt="">
                  </button>
                </div>
                <div>
                        <button onclick="congratsModal()" class="text-xs md:text-sm font-bold border text-[#0E7A81] border-[#0E7A81] rounded-md px-2 py-1 hover:bg-green-300">Adopt</button>
                </div>
                <div>
                    <button onclick="loadModal1('${singlePet.petId}')"  class="hover:bg-green-300 text-xs md:text-sm font-bold border text-[#0E7A81] border-[#0E7A81] rounded-md px-2 py-1">Details</button>
                </div>
            </div>
            
            
            </div>

            `
            cardContainer.append(allCards)
        })
     }

   


const likedImage = (image)=>{
    const imageContainer =document.getElementById("liked-container")
    const div =document.createElement('div')
    div.innerHTML=`
    <div class="md:cols-span-1  border border-stone-200 rounded-md p-2">
                        <img class="h-full md:w-full  rounded-md" src=${image}>
                    </div>
    `;
    imageContainer.append(div)
}


// modal section
const loadModal1 = (petId) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)

        .then((res) => res.json())
        .then((data) => showModal(data.petData))
        .catch((error) => console.log(error))
         
}
const showModal = (petData)=>{
    console.log(petData);
    
    const modalContainer = document.getElementById("modal-details");
    modalContainer.innerHTML=`
      <dialog id="my_modal_1" class="modal">
                <div class="modal-box">
                     <figure class="lg:px-4 lg:pt-4 md:px-3 md:pt-3 px-2 pt-2">
                            <img class="w-full rounded-xl" src="${petData.image}"
                                alt="Shoes" class="rounded-xl" />
                        </figure>
                        <div class="card-body p-3 md:p-3 lg:p-4 space-y-2">
                            <div>
                                <p class="text-black lg:text-2xl md:text-xl  font-bold">${petData.pet_name}</p>
                            </div>

                            <div class="flex gap-4">
                            
                            <div>
                            <div class="flex items-center gap-2"> <img class="w-4 md:w-6" 
                                    src="https://img.icons8.com/?size=80&id=67667&format=png"
                                    alt="">
                                <p class="text-gray-500 font-semibold">Breed: ${petData.breed}</p>
                            </div>

                            
                            <div class="flex items-center gap-2"><img class="w-4 md:w-6"
                                    src="https://img.icons8.com/?size=80&id=70834&format=png"
                                    alt="">
                                <p class="text-gray-500 lg:text-lg md:text-lg font-semibold">Gender: ${petData.gender}</p>

                            </div>

                            
                            <div class="flex items-center gap-2"><img class="w-4 md:w-6"
                                    src="https://img.icons8.com/?size=50&id=962&format=png"
                                    alt="">
                                <p class="text-gray-500 lg:text-lg md:text-lg font-semibold">Vaccination: ${petData.vaccinated_status}</p>

                            </div>
                            </div>
                            <div>
                             <div class="flex items-center gap-2"><img class="w-4 md:w-6"
                                    src="https://img.icons8.com/?size=80&id=fXgL1AuZbbYX&format=png" alt="">
                                <p class="text-gray-500 lg:text-lg md:text-lg font-semibold">Birth: ${petData.date_of_birth}</p>

                            </div>


                            <div class="flex items-center gap-2"> <img class="w-4 md:w-6"
                                    src="https://img.icons8.com/?size=24&id=85801&format=png" alt="">

                                <p class="text-gray-500 lg:text-lg  md:text-lg font-semibold">Price : ${petData.price}$</p>
                            </div>
                            </div>
                           
                            </div>

                            

                            <div class=" gap-2">
                                <p class="text-lg font-bold">Details Information</p>
                                <p class="text-gray-500  font-semibold">Price : ${petData.pet_details}</p>
                            </div>

                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn bg-[#E7F2F2] border border-blue-400 text-[#0E7A81] w-full rounded-xl text-sm">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
    
    `;


    my_modal_1.showModal();
}



const congratsModal = () => {

    const AdoptCongratsModal = document.getElementById("congrats-modal-details")

    AdoptCongratsModal.innerHTML = `
    <dialog id="my_modal_2" class="modal">
           <div class="modal-box text-center">
           <div class="flex justify-center items-center">
           <img class="flex justify-center items-center" src="https://img.icons8.com/?size=100&id=q6BlPrJZmxHV&format=png&color=000000" alt="">
           </div>
             <h1 class="text-lg font-bold">Congrates</h1>
             <p class="py-4">Adoption Process id start for your pet.</p>
             <span id="countdown-value" class="countdown font-mono text-6xl">
              3
            </span>
           </div>
          
           <form method="dialog" class="modal-backdrop">
             <button>close</button>
           </form>
    </dialog>
    
    `;
    const countdownNumber = document.getElementById("countdown-value");
    let counter = 3; // Set initial countdown value

    // Show the modal
    my_modal_2.showModal();

    // Start the countdown
    const countdownInterval = setInterval(() => {
        counter--;
        countdownNumber.innerText = counter;

        // When the countdown reaches 0, stop the interval and close the modal
        if (counter <= 1) {
            clearInterval(countdownInterval);
            setTimeout(() => {
                my_modal_2.close();  // Automatically close the modal after countdown finishes
            }, 1000); // Close after a short delay (1 second)
        }
    }, 1000);


}