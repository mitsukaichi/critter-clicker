// Function to add a new comment
async function newComment(event) {
    event.preventDefault();
    console.log("new comment clicked");

    const comment_text = document.getElementById("comment").value.trim();
    const url = window.location.toString().split('/');
    const posts_id = url[url.length - 1];
    const error = document.getElementById('comment-error');

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: "POST",
            body: JSON.stringify({
                posts_id,
                comment_text,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(comment_text);
        console.log(response);
        if (response.ok) {
            document.location.reload();
        } else {
            response.json()
            // .then(dataErr => {
            //     error.innerHTML = `<p class="error">${dataErr.errors[0].message}</p>`;
            // }); 
        }
    }
}

document.getElementById("comment-form").addEventListener("submit", newComment);