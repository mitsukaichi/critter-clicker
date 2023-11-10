// Function to add a new comment
async function newComment(event) {
    event.preventDefault();
    console.log("new comment clicked");

    const comment = document.getElementById("comment").value.trim();
    const url = window.location.toString().split('/');
    const Posts_id = url[url.length - 1];
    const error = document.getElementById('comment-error');

    if (comment) {
        const response = await fetch('/api/comments', {
            method: "POST",
            body: JSON.stringify({
                Posts_id,
                comment,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            response.json()
            .then(dataErr => {
                error.innerHTML = `<p class="error">${dataErr.errors[0].message}</p>`;
            }); 
        }
    }
}

document.getElementById("comment-form").addEventListener("submit", newComment);