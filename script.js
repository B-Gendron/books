document.addEventListener('DOMContentLoaded', function() {
    console.log("Document loaded. Parsing CSV file.");

    const genreFilter = document.getElementById('genre-filter');
    const auteurFilter = document.getElementById('auteur-filter');
    const titreFilter = document.getElementById('titre-filter');
    const statutFilter = document.getElementById('statut-filter');

    const applyFilters = () => {
        const genreValue = genreFilter.value.toLowerCase();
        const auteurValue = auteurFilter.value.toLowerCase();
        const titreValue = titreFilter.value.toLowerCase();
        const statutValue = statutFilter.value;

        document.querySelectorAll('#books-table tbody tr').forEach(row => {
            const genre = row.children[0].textContent.toLowerCase();
            const auteur = row.children[2].textContent.toLowerCase();
            const titre = row.children[1].textContent.toLowerCase();
            const statut = row.children[3].textContent;

            const genreMatch = genre.includes(genreValue);
            const auteurMatch = auteur.includes(auteurValue);
            const titreMatch = titre.includes(titreValue);
            const statutMatch = !statutValue || statut === statutValue;

            row.style.display = (genreMatch && auteurMatch && statutMatch && titreMatch) ? '' : 'none';
        });
    };

    genreFilter.addEventListener('input', applyFilters);
    auteurFilter.addEventListener('input', applyFilters);
    titreFilter.addEventListener('input', applyFilters)
    statutFilter.addEventListener('change', applyFilters);

    Papa.parse('books.csv', {
        download: true,
        header: true,
        complete: function(results) {
            console.log("CSV file parsed.");
            console.log(results);
            const data = results.data;
            const tableBody = document.getElementById('books-table').getElementsByTagName('tbody')[0];

            data.forEach(book => {
                const row = document.createElement('tr');

                Object.keys(book).forEach(key => {
                    const cell = document.createElement('td');
                    cell.textContent = book[key];

                    if (key === "Statut") {
                        if (book[key] === "Terminé") {
                            cell.classList.add("status-termine");
                        } else if (book[key] === "En cours") {
                            cell.classList.add("status-en-cours");
                        } else if (book[key] === "À lire") {
                            cell.classList.add("status-a-lire");
                        }
                    }

                    row.appendChild(cell);
                });

                tableBody.appendChild(row);
            });

            // Apply filters once the table is populated
            applyFilters();
        },
        error: function(error) {
            console.error("Error parsing CSV file:", error);
        }
    });
});
