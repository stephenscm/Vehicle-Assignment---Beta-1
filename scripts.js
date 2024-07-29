let vehicles = [];
let currentEditIndex = -1;
let names = [
    "Billie", "Mike", "Trey", "White", "Freece", "Preston",
    "Bill", "Dugan", "Littleton", "Stephens", "Greg", "Ryan", "Eden",
    "Sam", "AJ", "New Guy",
    "Adrienne", "Brittany", "Sarah"
]; // List of names

function checkCustomVehicleType() {
    const vehicleType = document.getElementById('vehicle-type').value;
    const customVehicleType = document.getElementById('custom-vehicle-type');
    
    if (vehicleType === 'custom') {
        customVehicleType.style.display = 'block';
    } else {
        customVehicleType.style.display = 'none';
    }
}

function addVehicle() {
    let type = document.getElementById('vehicle-type').value;
    const customType = document.getElementById('custom-vehicle-type').value;
    
    if (type === 'custom') {
        type = customType;
    }

    const driverName = document.getElementById('driver-name').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const description = document.getElementById('vehicle-description').value;

    const vehicle = {
        type,
        driverName,
        phoneNumber,
        description,
        occupants: []
    };

    vehicles.push(vehicle);
    clearVehicleForm();
    updateVehicleList();
    updateVehicleDropdown();
}

function clearVehicleForm() {
    document.getElementById('vehicle-type').value = 'car';
    document.getElementById('custom-vehicle-type').value = '';
    document.getElementById('custom-vehicle-type').style.display = 'none';
    document.getElementById('driver-name').value = '';
    document.getElementById('phone-number').value = '';
    document.getElementById('vehicle-description').value = '';
    document.getElementById('add-vehicle-btn').style.display = 'block';
    document.getElementById('update-vehicle-btn').style.display = 'none';
    currentEditIndex = -1;
}

function updateVehicleList() {
    const vehicleContainer = document.getElementById('vehicles');
    vehicleContainer.innerHTML = '';

    vehicles.forEach((vehicle, index) => {
        const vehicleDiv = document.createElement('div');
        vehicleDiv.className = 'vehicle';
        vehicleDiv.innerHTML = `
            <h3>${vehicle.type}</h3>
            <p><strong>Driver:</strong> ${vehicle.driverName}</p>
            <p><strong>Phone:</strong> ${vehicle.phoneNumber}</p>
            <p><strong>Description:</strong> ${vehicle.description}</p>
            <p><strong>Occupants:</strong> ${vehicle.occupants.join(', ')}</p>
            <div class="vehicle-buttons">
                <button class="edit-btn" onclick="editVehicle(${index})">Edit</button>
                <button onclick="deleteVehicle(${index})">Delete</button>
            </div>
        `;
        vehicleContainer.appendChild(vehicleDiv);
    });
}

function updateVehicleDropdown() {
    const selectVehicle = document.getElementById('select-vehicle');
    selectVehicle.innerHTML = '';

    vehicles.forEach((vehicle, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${vehicle.type} - ${vehicle.description}`;
        selectVehicle.appendChild(option);
    });
}

function populateOccupantDropdown() {
    const selectOccupant = document.getElementById('occupant-name');
    selectOccupant.innerHTML = '';

    names.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        selectOccupant.appendChild(option);
    });
}

function updateOccupantList() {
    const occupantList = document.getElementById('occupant-list');
    occupantList.innerHTML = '';

    names.forEach((name, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="name">${name}</span>
            <button class="edit-btn" onclick="editOccupant(${index})">Edit</button>
            <button onclick="deleteOccupant(${index})">Delete</button>
        `;
        occupantList.appendChild(li);
    });
}

function assignOccupant() {
    const occupantName = document.getElementById('occupant-name').value;
    const vehicleIndex = document.getElementById('select-vehicle').value;

    if (occupantName && vehicleIndex !== '') {
        vehicles[vehicleIndex].occupants.push(occupantName);
        updateVehicleList();
    }
}

function addOccupant() {
    const newOccupantName = document.getElementById('new-occupant-name').value;

    if (newOccupantName) {
        names.push(newOccupantName);
        populateOccupantDropdown();
        updateOccupantList();
        document.getElementById('new-occupant-name').value = '';
    }
}

function editVehicle(index) {
    const vehicle = vehicles[index];
    document.getElementById('vehicle-type').value = vehicle.type;
    if (!['car', 'suv', 'van', 'bus'].includes(vehicle.type)) {
        document.getElementById('vehicle-type').value = 'custom';
        document.getElementById('custom-vehicle-type').value = vehicle.type;
        document.getElementById('custom-vehicle-type').style.display = 'block';
    } else {
        document.getElementById('custom-vehicle-type').style.display = 'none';
    }
    document.getElementById('driver-name').value = vehicle.driverName;
    document.getElementById('phone-number').value = vehicle.phoneNumber;
    document.getElementById('vehicle-description').value = vehicle.description;

    document.getElementById('add-vehicle-btn').style.display = 'none';
    document.getElementById('update-vehicle-btn').style.display = 'block';

    currentEditIndex = index;
}

function updateVehicle() {
    if (currentEditIndex >= 0) {
        let type = document.getElementById('vehicle-type').value;
        const customType = document.getElementById('custom-vehicle-type').value;

        if (type === 'custom') {
            type = customType;
        }

        const driverName = document.getElementById('driver-name').value;
        const phoneNumber = document.getElementById('phone-number').value;
        const description = document.getElementById('vehicle-description').value;

        vehicles[currentEditIndex] = {
            ...vehicles[currentEditIndex],
            type,
            driverName,
            phoneNumber,
            description
        };

        clearVehicleForm();
        updateVehicleList();
        updateVehicleDropdown();
    }
}

function deleteVehicle(index) {
    vehicles.splice(index, 1);
    updateVehicleList();
    updateVehicleDropdown();
}

function editOccupant(index) {
    const newName = prompt("Edit Occupant Name:", names[index]);
    if (newName !== null && newName !== "") {
        names[index] = newName;
        populateOccupantDropdown();
        updateOccupantList();
    }
}

function deleteOccupant(index) {
    names.splice(index, 1);
    populateOccupantDropdown();
    updateOccupantList();
}

window.onload = function() {
    populateOccupantDropdown();
    updateOccupantList();
};
