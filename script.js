function submitForm() {
    const form = document.getElementById('placementForm');
    const formData = new FormData(form);
    
    const data = {
        name: formData.get('name'),
        usn: formData.get('usn'),
        branch: formData.get('branch'),
        company: formData.get('company'),
        ctc: formData.get('ctc'),
        phonenumber: formData.get('phonenumber'),
        date_of_placement: formData.get('date_of_placement')
    };

    fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function searchPlacements() {
    const query = document.getElementById('search').value;
    
    fetch(`http://localhost:3000/search?query=${query}`)
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        if (data.length === 0) {
            resultsDiv.innerHTML = '<p>No results found.</p>';
            return;
        }

        const table = document.createElement('table');
        table.border = '1';

        const header = table.createTHead();
        const headerRow = header.insertRow(0);

        const headers = ['Name', 'USN', 'Branch', 'Company', 'CTC', 'Phone Number', 'Date of Placement'];
        headers.forEach(headerText => {
            const cell = headerRow.insertCell();
            cell.textContent = headerText;
        });

        const tbody = table.createTBody();
        data.forEach(row => {
            const rowElement = tbody.insertRow();

            const cell1 = rowElement.insertCell();
            cell1.textContent = row.name;

            const cell2 = rowElement.insertCell();
            cell2.textContent = row.usn;

            const cell3 = rowElement.insertCell();
            cell3.textContent = row.branch;

            const cell4 = rowElement.insertCell();
            cell4.textContent = row.company;

            const cell5 = rowElement.insertCell();
            cell5.textContent = row.ctc;

            const cell6 = rowElement.insertCell();
            cell6.textContent = row.phonenumber;

            const cell7 = rowElement.insertCell();
            cell7.textContent = row.date_of_placement;
        });

        resultsDiv.appendChild(table);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
