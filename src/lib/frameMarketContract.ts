export const FRAME_MARKET_ADDRESS = '0x72ff012103660445A024e9426A7Ca2d3B353aaD9' as const;

export const FRAME_MARKET_ABI = [
  {"inputs":[{"internalType":"uint16","name":"_feeBps","type":"uint16"},{"internalType":"address","name":"_feeRecipient","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},
  {"inputs":[],"name":"FeeRecipientZero","type":"error"},
  {"inputs":[],"name":"FeeTooHigh","type":"error"},
  {"inputs":[],"name":"InvalidPrice","type":"error"},
  {"inputs":[],"name":"ListingIdOverflow","type":"error"},
  {"inputs":[],"name":"NotActive","type":"error"},
  {"inputs":[],"name":"NotApproved","type":"error"},
  {"inputs":[],"name":"NotERC721","type":"error"},
  {"inputs":[],"name":"NotSeller","type":"error"},
  {"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},
  {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},
  {"inputs":[],"name":"TransferFailed","type":"error"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint96","name":"listingId","type":"uint96"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"FeeCollected","type":"event"},
  {"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"feeBps","type":"uint16"},{"indexed":false,"internalType":"address","name":"feeRecipient","type":"address"}],"name":"FeeUpdated","type":"event"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint96","name":"id","type":"uint96"},{"indexed":true,"internalType":"address","name":"seller","type":"address"},{"indexed":true,"internalType":"address","name":"nft","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"}],"name":"Listed","type":"event"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint96","name":"id","type":"uint96"}],"name":"ListingCancelled","type":"event"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint96","name":"id","type":"uint96"},{"indexed":false,"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"ListingUpdated","type":"event"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint96","name":"id","type":"uint96"},{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":true,"internalType":"address","name":"seller","type":"address"},{"indexed":false,"internalType":"address","name":"nft","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"}],"name":"Purchased","type":"event"},
  {"inputs":[{"internalType":"uint96","name":"listingId","type":"uint96"}],"name":"cancel","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"feeBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"feeRecipient","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint96","name":"listingId","type":"uint96"}],"name":"getListing","outputs":[{"components":[{"internalType":"address","name":"seller","type":"address"},{"internalType":"address","name":"nft","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"internalType":"struct FrameMarket.Listing","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint96","name":"listingId","type":"uint96"}],"name":"isListingActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"nft","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"}],"name":"list","outputs":[{"internalType":"uint96","name":"listingId","type":"uint96"}],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"uint96","name":"","type":"uint96"}],"name":"listings","outputs":[{"internalType":"address","name":"seller","type":"address"},{"internalType":"address","name":"nft","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"nextListingId","outputs":[{"internalType":"uint96","name":"","type":"uint96"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"pure","type":"function"},
  {"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint96","name":"listingId","type":"uint96"}],"name":"purchase","outputs":[],"stateMutability":"payable","type":"function"},
  {"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"uint16","name":"_feeBps","type":"uint16"},{"internalType":"address","name":"_feeRecipient","type":"address"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"uint96","name":"listingId","type":"uint96"},{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"updatePrice","outputs":[],"stateMutability":"nonpayable","type":"function"}
] as const;

export const frameMarketContract = {
  address: FRAME_MARKET_ADDRESS,
  abi: FRAME_MARKET_ABI,
} as const;
