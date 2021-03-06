/*
    LEGO Universe News! Patcher

    Created 2013-2014 Triangle717 & rioforce
    <http://Triangle717.WordPress.com/>
    <http://rioforce.WordPress.com/>

    Licensed under The MIT License
    <http://opensource.org/licenses/MIT>
    */

    $(document).ready(function() {
        "use strict";

    // Gets a random YouTube video from a specified playlist within parameters. 

    // Assign value for specific video ID. Otherwise, leave defined without assignment.
    var ytVideoId;

    var ytDomain = "http://www.youtube.com/embed/";
    var ytVideoParams = "?html5=1&rel=0&autohide=1&modestbranding=1";

    // TODO: should probably change this to a more suitable playlist... :P
    
    // YouTube playlist id, i.e. the "list" parameter in regular YouTube queries. 
    var playlistId = "PLRNbTEZ7dhL1TMtx5-LePt3XwP7Zfeeta";
    var apiBaseUrl = "https://gdata.youtube.com/feeds/api/playlists/";

    // Higher numbers will lead to bigger requests, but more varied videos. 
    // Needs to be under 50 to comply with YouTube Data API limitations. 
    var videoRequestCount = 10;

    var randomVideoIndex = Math.floor((Math.random() * videoRequestCount));
    var queryString = "?v=2&alt=jsonc&max-results=" + videoRequestCount;

    // This is the string we are sending to the YouTube Data API
    var apiString = apiBaseUrl + playlistId + queryString;
    console.log("Fetching YouTube data from: " + apiString);

    var video;

    // If the video ID is null or undefined, we use a playlist and select a video at random
    if (!ytVideoId)
    {    
        $.getJSON(apiString, function(data)
        {
            // Get a random video
            video = data.data.items[randomVideoIndex].video;

            // If something went bad...
            if (!video)
            {
                // Display an error message instead of the YouTube iframe
                document.getElementById("video-div").innerHTML = '<img id="video-error" alt="Video error" src="img/video-error.png" />';
            }
            else
            {
                // Assign the YouTube embed code after we select a video.
                document.getElementById("video-div").innerHTML = '<iframe id="yt-video" allowfullscreen></iframe>';
                document.getElementById("yt-video").src = ytDomain + video.id + ytVideoParams;
            }
        });
    }
    else
    {
        // Use a specific ID instead of selecting one at random from a playlist
        document.getElementById("video-div").innerHTML = '<iframe id="yt-video" allowfullscreen></iframe>';
        document.getElementById("yt-video").src = ytDomain + ytVideoId + ytVideoParams;
    }

    // RSS feed of posts on LUN
    $("#news-feed-content").FeedEk({
        FeedUrl: "http://legouniversenews.wordpress.com/feed/",
        MaxCount: 5,
        ShowDesc: true,
        ShowPubDate: false,
        DescCharacterLimit: 155,
        TitleLinkTarget: "_blank"
    });
    
    // Adjust the CSS to align the feed
    $("#news-feed-content").css("right", "0.938em");

    var $newsFeed = $("#news-feed");
    // Activate perfect-scrollbar
    $newsFeed.perfectScrollbar({
        wheelSpeed: 30,
        suppressScrollX: true
    });
    // Always scroll to the top of the feed on page load
    $newsFeed.scrollTop(0);
    $newsFeed.perfectScrollbar('update');
});
