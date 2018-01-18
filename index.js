//waits until the DOM is loaded, then runs this script.
$(document).ready(function() {

    $.ajax({ // when loaded, make the ajax request to the api and retrieve all "friends"
        url: 'http://rest.learncode.academy/api/WhatMatters/friends',
        type: 'GET'
    }).done( (data) => { //when the array comes back, iterate over it
        data.forEach((eachFriend) => { //for each friend, create the full name and build it in the list-item
            let name = eachFriend.first + " " + eachFriend.last
            let newElement = createFriend(name, eachFriend.id)
            $('#friend-list').append(newElement) //puts the list into a list
        })
    }).fail( () => { //if unable to comply, says following statement
        alert('Failed, unable to retrieve.')
    })

    $('#friend-form').submit( (e) => { //wehn loaded, make the click event for the add button
        e.preventDefault() //stops the page from refreshing, then gets value from input
        let newFriend = $('#input').val()
//splits the name based on first space found
        let first = newFriend.substr(0, newFriend.indexOf(' '))
        let last = newFriend.substr(newFriend.indexOf(' ')+1)

        $.ajax({ //sends the info to the API
            url: 'http://rest.learncode.academy/api/WhatMatters/friends',
            type: 'POST',
            data: {
                first: first,
                last: last,
                email: `${first.toLowerCase()}@${last.toLowerCase()}.com`
            }
        }).done( (data) => { // on success, the input is created and added to the list
            let newElement = createFriend(newFriend, data.id)
        $('#friend-list').append(newElement) //clears the input field
        $('#input').val('')
        }).fail( () => { //alert on fail
            alert('Failed, unable to post.')
        })

    })
    $('#friend-list').on('click', 'li', function(e) { //when list-item is clicked, do the function
        $.ajax({ // ajax delete upon request from API, gets id from click devent details
            url: 'http://rest.learncode.academy/api/WhatMatters/friends',
          type: 'DELETE'
        }).done( () => { // on success, remove the list item
            $(this).remove()
        }).fail( () => {
            alert('Delete failed.')
    })
       
    })

    function createFriend(name, id) { //this creates the list html element for the input for the given name/id
        //applies CSS classes to the element as well accrding to style
        return $(`<li>${name}</li>`).addClass('list-group-item list-group-item-action list-group-item-dark').attr('id',id)
    }

})