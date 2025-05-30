const CHAT_URL1 = 'https://gist.githubusercontent.com/asharijuang/23745f3132fa30e666db68d2bf574e4a/raw/5d556dbb9c2aea9fdf3e1ec96e45f62a88cea7b6/chat_response.json';
const CHAT_URL2 = 'https://gist.githubusercontent.com/vandawam/56911ebb846d19215645968a2177af8c/raw/d84c0f23f7625b908a2f54bd572b48b75f8ce230/gistfile1.json';

fetch(CHAT_URL1)
  .then(res => res.json())
  .then(data => {
    const image1 = document.getElementById('image1');
    image1.src = data.results[0].room.image_url;
    const name1 = document.getElementById('name1');
    name1.textContent = data.results[0].room.name;
    const text1 = document.getElementById('text1');
    let msg = data.results[0].comments[data.results[0].comments.length - 1].message;
    text1.textContent = msg.length > 15 ? msg.slice(0, 15) + "..." : msg;
  });

fetch(CHAT_URL2)
  .then(res => res.json())
  .then(data => {
    const image1 = document.getElementById('image2');
    image1.src = data.results[0].room.image_url;
    const name1 = document.getElementById('name2');
    name1.textContent = data.results[0].room.name;
    const text1 = document.getElementById('text2');
    let msg = data.results[0].comments[data.results[0].comments.length - 1].message;
    text1.textContent = msg.length > 15 ? msg.slice(0, 15) + "..." : msg;
  });

function renderChat(url) {
  const mainChat = document.getElementById('main-chat');
  const participantList = document.getElementById('room-participant');
  const noChat = document.getElementById('no-chat');

  let CHAT_URL = url === 1 ? CHAT_URL1 : CHAT_URL2;

  participantList.innerHTML = ` `

  fetch(CHAT_URL)
    .then(res => res.json())
    .then(data => {
      const room = data.results[0].room;
      const comments = data.results[0].comments;
      const chatBox = document.getElementById('chat');
      console.log(data);


      // Tampilkan nama dan gambar room
      document.getElementById('room-name').textContent = room.name;
      document.getElementById('room-image').src = room.image_url;

      // Tampilkan participant
      room.participant.forEach(participant => {
        participantList.innerHTML += `${participant.name}, `
      });

      // Kosongkan chat-box
      chatBox.innerHTML = '';

      // Render setiap chat
      comments.forEach(comment => {
        const div = document.createElement('div');
        const divChild = document.createElement('div');
        const divChild2 = document.createElement('div');
        const divChild3 = document.createElement('div');
        const sender = comment.sender;
        const senderName = room.participant.find(p => p.id === sender)?.name || sender;

        div.className = 'w-full flex my-1 ' + (sender === 'customer@mail.com' ? ' justify-end pr-10 pl-40' : 'pl-10 pr-40');
        divChild.className = ' rounded-lg px-4 py-2 flex flex-col gap-1' + (sender === 'customer@mail.com' ? ' bg-slate-400 rounded-br-none' : ' bg-slate-300 rounded-bl-none');

        if (sender !== 'customer@mail.com') {
          divChild2.textContent = senderName;
          divChild2.className = 'font-bold text-red-700';
          divChild.appendChild(divChild2);
        }

        if (comment.type === 'image') {
          const img = document.createElement('img');
          img.src = comment.url;
          divChild.appendChild(img);
        }

        if (comment.type === 'video') {
          const video = document.createElement('video');
          video.src = comment.url;
          video.controls = true;
          divChild.appendChild(video);
        }

        if (comment.type === 'pdf') {
          const iframe = document.createElement('button');
          iframe.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-file-earmark-pdf" viewBox="0 0 16 16">  <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>  <path d="M4.603 14.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.7 11.7 0 0 0-1.997.406 11.3 11.3 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.245.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 7.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z"/></svg>`;
          iframe.onclick = () => {
            window.open(comment.url, '_blank');
          };
          divChild.appendChild(iframe);

        }


        divChild3.textContent = comment.message;
        divChild.appendChild(divChild3);
        div.appendChild(divChild);
        chatBox.appendChild(div);
      });
    })
    .catch(err => {
      console.error('Error fetching chat:', err);
    });


  mainChat.classList.remove('hidden');
  noChat.classList.add('hidden');
}

renderChat(2);
