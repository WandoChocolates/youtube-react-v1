export function buildMostPopularVideosRequest(
  amount = 12,
  loadDescription = false,
  nextPageToken
) {
  let fields =
    "nextPageToken,prevPageToken,items(contentDetails/duration,id,snippet(channelId,channelTitle,localized/title,publishedAt,thumbnails/medium,title),statistics/viewCount),pageInfo(totalResults)";
  if (loadDescription) {
    fields += ",items/snippet/description";
  }
  return buildApiRequest(
    "GET",
    "/youtube/v3/videos",
    {
      part: "snippet,statistics,contentDetails",
      chart: "mostPopular",
      maxResults: amount,
      regionCode: "US",
      pageToken: nextPageToken,
      fields
    },
    null
  );
}
