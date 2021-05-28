(function () {

    /*************************************/
    /* FLIP SLIDES logic and controls ****/
    /*************************************/

    var slides = document.querySelectorAll('.form-item');
    var prev  = document.getElementById('prev');
    var next = document.getElementById('next');
    var currentSlide = 0;
    var activeSlide = 0;
    var lastSlideNumber = slides.length;    
    var callToActionBtn = document.querySelector('.calltoaction'); 
    callToActionBtn.style.display = 'none'; 

    // Events Listeners prev next buttons
    prev.addEventListener('click', flipSlide);
    next.addEventListener('click', flipSlide);

    /* Prev Next Event Handler 
     * Check last and First Slide and Check Slide
     * if inputs are checked
    */
   function flipSlide(){
    if(event.target.id === 'next' && activeSlide != lastSlideNumber && checkSlide(currentSlide) )
    {
        activeSlide = activeSlide + 1;
        makeActiveSlide(activeSlide);
        currentSlide = activeSlide;
        if( currentSlide === 11 ){
            callToActionBtn.style.display = 'block';
        } else {
            callToActionBtn.style.display = 'none';
        }
        console.log("currentSlide = " + currentSlide);
    }
    if(event.target.id === 'prev' && activeSlide != 0){
        activeSlide = activeSlide - 1;
        makeActiveSlide(activeSlide);
        currentSlide = activeSlide;
        console.log("currentSlide = " + currentSlide);
        if( currentSlide === 10 ){
            callToActionBtn.style.display = 'none';
        }
        
    }
    
}
    // Toggle active class
    function makeActiveSlide(n){
        var currentSlideEl = document.getElementById(currentSlide).classList.remove('active');
        var newActiveSlide = document.getElementById(n).classList.add('active');
    }



// Are there on slide checked elements before leaving this slide
    function checkSlide(currentSlide){

        switch(currentSlide){
            case 0:
                if(!isRadioBoxChecked('ownership_form')){
                    return false;
                }
                return true;
            case 1:
                if(!isRadioBoxChecked("tax_system"))
                {
                    return false;
                }
                return true;
            case 2:
                if(!isAnyCheckboxChecked('services'))
                {
                    return false;
                }
                return true;
            case 3: case 4: case 5: case 6: case 7: case 8: case 9:
                callToActionBtn.style.display = 'none';
                return true;
            case 10:
               
                return true;    
            case 11:
                
                return false;
            case 12: {
                //document.getElementById('next').style.display = 'none';
            }
            default:
                console.log("Error! There is not such slide number");
                return false;
        }
    }
/*******   END FLIP SLIDES   *********/

/*************************************/
/**** UPDATE CLIENT DATA AND SUM *****/
/*************************************/


// SUM SPAN UPDATE
function updateSum(number){
    document.getElementById('sum').innerText = number.toString();
}

// ALL INPUTS EL EVENT LISTENERS
var allCalcInputs = document.querySelector('.calculator_block').querySelectorAll('input');
for(var i = 0; i < allCalcInputs.length; i++){
    allCalcInputs[i].addEventListener('change', updateClientData);
} 

// INPUTS CHANGE EVENTs HANDLER
// Update clientData and currentSum Objects
// priceList assigned to tovPriceList or fopPriceList

var clientPriceList = {};
var currentServicesCost = 0;
var checkBoxes_checked_elem_array = [];
var services_value_array = [];
var sum = 0;

function updateClientData(e){
    var inputEl = e.target;
    var inputElId = inputEl.id;
  
    switch(inputEl.name){
        case 'ownership_form':
            // Save tov/fop string to clientData.ownership_form 
            clientData.ownership_form = inputElId;
            document.getElementById('service_calc').reset();
            // Assign tov or fop PRICELIST to clientData obj
            if(clientData.ownership_form === 'tov'){
                clientPriceList = tovPriceList;
                document.getElementById('tov').checked = true;
            }
            if(clientData.ownership_form === 'fop'){
                clientPriceList = fopPriceList;
                document.getElementById('fop').checked = true;
            } 
            // Set to 0 all props of object currentSum
            resetObjectValuesToZero(currentSum);
            
            currentServicesCost  =  sumToDisplay(currentSum); 
            updateSum(currentServicesCost);
            break;
        case 'tax_system':
            clientData.tax_system = checkedRadioBoxValue("tax_system");
            resetObjectValuesToZero(currentSum.tax_system);
            currentSum.tax_system[clientData.tax_system] = clientPriceList.tax_system[clientData.tax_system];
            currentServicesCost = sumToDisplay(currentSum);
            updateSum(currentServicesCost);
            break;

        case 'services':
            // Array of checked Elements with name SERVICES
            checkBoxes_checked_elem_array = document.querySelectorAll("input[name='services']:checked");
            // Array of Values of checked Elements with name SERVICES
            services_value_array = [];

            for (var i = 0; i < checkBoxes_checked_elem_array.length; i++) {
                services_value_array.push(checkBoxes_checked_elem_array[i].value);
            }
            clientData.services = services_value_array;
            resetObjectValuesToZero(currentSum.services);

            for( var i = 0; i < clientData.services.length; i++ ) {
                currentSum.services[clientData.services[i]] = clientPriceList.services[clientData.services[i]];

            }
            currentServicesCost = sumToDisplay(currentSum);
            updateSum(currentServicesCost);
            services_value_array = [];
            break;

        case 'complex_services':
            // Array of checked Elements with name complex_services
            checkBoxes_checked_elem_array = document.querySelectorAll("input[name='complex_services']:checked");
            // Array of Values of checked Elements with name SERVICES
            services_value_array = [];

            for (var i = 0; i < checkBoxes_checked_elem_array.length; i++) {
                services_value_array.push(checkBoxes_checked_elem_array[i].value);
            }
            clientData.complex_services = services_value_array;
            resetObjectValuesToZero(currentSum.complex_services);

            for( var i = 0; i < clientData.complex_services.length; i++ ) {
                currentSum.complex_services[clientData.complex_services[i]] = clientPriceList.complex_services[clientData.complex_services[i]];

            }
            currentServicesCost = sumToDisplay(currentSum);
            updateSum(currentServicesCost);
            break;

        case 'additional_services':
            console.log('********* Start of additional services ************');
            checkBoxes_checked_elem_array = document.querySelectorAll("input[name='additional_services']:checked");
            // Array of Values of checked Elements with name SERVICES
            var additional_services_value_array = [];

            for (var i = 0; i < checkBoxes_checked_elem_array.length; i++) {
                additional_services_value_array.push(checkBoxes_checked_elem_array[i].value);
            }
            
            clientData.additional_services = additional_services_value_array;
            resetObjectValuesToZero(currentSum.additional_services);
            // Write to currentSum cost of chosen additional services
            for( var i = 0; i < clientData.additional_services.length; i++ ) {
                currentSum.additional_services[clientData.additional_services[i]] = clientPriceList.additional_services[clientData.additional_services[i]];

            }
            currentServicesCost = sumToDisplay(currentSum);
            updateSum(currentServicesCost);
            break;
        case 'kas_apparat':
            /********************** SLIDE 4 ******************************/
            var kass_apparat_kilkist = document.getElementById('kas_apparat').value;
            clientData.kas_apar_kilk = kass_apparat_kilkist;
            clientData.kas_apar_vartist = clientData.kas_apar_kilk * clientPriceList.kas_apparat.kas_apparat_odyn;
            currentSum.kas_apar_vartist = clientData.kas_apar_vartist;
            currentServicesCost  =  sumToDisplay(currentSum);
            updateSum(currentServicesCost);
            break;
        case 'zarplata':
            var kilkist_pracivnykiv = document.getElementById('zarplata').value;
            clientData.zarplata.zarplata_kilk = kilkist_pracivnykiv;
            clientData.zarplata.zarplata_vartist = clientData.zarplata.zarplata_kilk * clientPriceList.zarplata.zarplata_odyn;
            currentSum.zarplata.zarplata_vartist = clientData.zarplata.zarplata_vartist;
            currentServicesCost  =  sumToDisplay(currentSum);
            updateSum(currentServicesCost);
            break;
        case 'kadry':
            clientData.kadry.kadry_kilk = document.getElementById('kadry').value;
            console.log('kadry ' + clientData.kadry.kadry_kilk );
            clientData.kadry.kadry_vartist = clientData.kadry.kadry_kilk * clientPriceList.kadry.kadry_odyn;
            currentSum.kadry.kadry_vartist = clientData.kadry.kadry_vartist;
            currentServicesCost  =  sumToDisplay(currentSum);
            updateSum(currentServicesCost);
            break;
        case 'vyhidni_doc':
            /********************** SLIDE 7 ******************************/
            clientData.realizaciya.vyhidni_doc_kilk = document.getElementById('vyhidni_doc').value;
            clientData.realizaciya.podatk_nakladni_kilk = document.getElementById('podatk_nakladni').value;
            clientData.realizaciya.vyhidni_doc_vartist = clientData.realizaciya.vyhidni_doc_kilk * clientPriceList.realizaciya.vyhidni_doc_odyn;
            clientData.realizaciya.podatk_nakladni_vartist = clientData.realizaciya.podatk_nakladni_kilk * clientPriceList.realizaciya.podatk_nakladni_odyn;
            currentSum.realizaciya.vyhidni_doc_vartist = clientData.realizaciya.vyhidni_doc_vartist;
            currentSum.realizaciya.podatk_nakladni_vartist = clientData.realizaciya.podatk_nakladni_vartist;
            currentServicesCost  =  sumToDisplay(currentSum);
            updateSum(currentServicesCost);
            break;
        case 'podatk_nakladni':
            /********************** SLIDE 7 ******************************/
            clientData.realizaciya.vyhidni_doc_kilk = document.getElementById('vyhidni_doc').value;
            clientData.realizaciya.podatk_nakladni_kilk = document.getElementById('podatk_nakladni').value;
            clientData.realizaciya.vyhidni_doc_vartist = clientData.realizaciya.vyhidni_doc_kilk * clientPriceList.realizaciya.vyhidni_doc_odyn;
            clientData.realizaciya.podatk_nakladni_vartist = clientData.realizaciya.podatk_nakladni_kilk * clientPriceList.realizaciya.podatk_nakladni_odyn;
            currentSum.realizaciya.vyhidni_doc_vartist = clientData.realizaciya.vyhidni_doc_vartist;
            currentSum.realizaciya.podatk_nakladni_vartist = clientData.realizaciya.podatk_nakladni_vartist;
            currentServicesCost  =  sumToDisplay(currentSum);
            updateSum(currentServicesCost);
            break;
        case 'bank':
            /********************** SLIDE 8 ******************************/
            clientData.bank.platezy_kilk = document.getElementById('bank').value;
            clientData.bank.bank_vartist = clientData.bank.platezy_kilk * clientPriceList.bank.platezy_odyn;
            currentSum.bank.bank_vartist = clientData.bank.bank_vartist;
            currentServicesCost = sumToDisplay(currentSum);
            updateSum(currentServicesCost);
            break;
        case 'pervynna_doc':
            clientData.pervynna_doc.pervynna_doc_kilk = document.getElementById('pervynna_doc').value;
            clientData.pervynna_doc.pervynna_doc_vartist =(clientData.pervynna_doc.pervynna_doc_kilk <= 50 && clientData.pervynna_doc.pervynna_doc_kilk != 0)? 1500: clientData.pervynna_doc.pervynna_doc_kilk * 30;  
            currentSum.pervynna_doc.pervynna_doc_vartist = clientData.pervynna_doc.pervynna_doc_vartist;
            currentServicesCost = sumToDisplay(currentSum);
            updateSum(currentServicesCost);
            break;
    }
}

/* Operations with objects that contain inner objects */
/******************************************************/
// SHOW ALL values in OBJECT

function showObjectValues (obj) {
    Object.keys(obj).forEach(function (key) {
        if (typeof obj[key] === 'object') {
            console.log('Show ' + key + ' ' + obj[key]);
            return showObjectValues(obj[key]);
        }
        
        console.log('Show ' + key + ' ' + obj[key]);
    });
}

function resetObjectValuesToZero (obj) {
    Object.keys(obj).forEach(function (key) {
        if (typeof obj[key] === 'object') {
            console.log('Reset key ' + key + ' obj[key] ' + obj[key]);
            return resetObjectValuesToZero(obj[key]);
        }
        obj[key] = 0;
        console.log('Reset key ' + key + ' obj[key] ' + obj[key]);
    });
}
function sumObjectValues (obj) {
    Object.keys(obj).forEach(function (key) {
        if (typeof obj[key] === 'object') {
            console.log('Sum ' + sum + " " + key + ' ' + obj[key]);
            return sumObjectValues(obj[key]);
        }
        sum = parseInt(sum) + parseInt(obj[key]);
        console.log('Sum ' + sum + " " + key + ' ' + obj[key]);
    });
}

function sumToDisplay(obj){
    sum = 0;
    sumObjectValues (obj);
    return sum;
}
/* Operations with inputs */
/*************************************/
// Return VALUE OF CHECKED RADIO BOX

function checkedRadioBoxValue(name){
    return document.querySelector("input[name='" + name + "']:checked").value;
}

// Return TRUE IF one of RADIO BOXES CHECKED
function isRadioBoxChecked(name){
    if(document.querySelector("input[name='" + name + "']:checked")){
        return true;
    } else {
        return false;
    }
}
// Return TRUE IF ANY of CHECK BOXES CHECKED
function isAnyCheckboxChecked(name){
    var arrLength = document.querySelectorAll("input[name='" + name + "']:checked").length;
    console.log('services arr length' + arrLength);
    if( arrLength >= 1){
        
        console.log('services' + true);
        return true;
    } else {
        console.log('services' + false);
        return false;
    }
}





}());