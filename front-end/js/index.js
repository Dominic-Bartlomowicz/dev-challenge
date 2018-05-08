const URL = "http://localhost:3000";

$(document).ready(() => {

  $.get(`${URL}/users`, data => {
    buildUserList(data);
  });


  const buildUserList = userData => {
    userData.forEach(user => {
      const { id, name } = user;
      const html = `<a href="#!" user-id=${id} class="collection-item user-list-item">${name}</a>`;
      $("#user-list").append(html);
    });

    $(".user-list-item").click(function() {
      const userId = $(this).attr("user-id");
      onSelectUser(userId);
    });
  };


  const buildAlbumList = albumData => {
    $("#photo-list").empty();
    $("#album-list").empty();
    albumData.forEach(album => {
      const { id, title } = album;
      const html = `<a href="#!" album-id=${id} class="collection-item album-list-item">${title}</a>`;
      $("#album-list").append(html);
    });

    $(".album-list-item").click(function() {
      const albumId = $(this).attr("album-id");
      onSelectAlbum(albumId);
    });
  }

  const buildPhotoList = photoData => {
    $("#photo-list").empty();
    $("#album-list").empty();
    photoData.forEach(photo => {
      const { id, title, thumbnailUrl } = photo;

      const image = `<img class="image" src="${thumbnailUrl}">`
      $("#user-photo").append(image);

      // const html = `<a photo-id=${id} class="collection-item photo-list-item">${title}</a>`;
      // $("#photo-list").append(html);
    });
  };


  const onSelectUser = userId => {
    console.log(`Now get user ${userId}'s albums...`);

    $.get(`${URL}/users/${userId}/albums`, data => {
      buildAlbumList(data);
    });
  };


  const onSelectAlbum = albumId => {
    console.log(`Now get user ${albumId}'s photos...`);

    $.get(`${URL}/albums/${albumId}/photos`, data => {
      buildPhotoList(data);
    });
  };

});
