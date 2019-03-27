package datatypes

// Textbook represents a book on Algolia and Firebase
type Textbook struct {
	Title     string `json:"title" firestore:"title"`
	Author    string `json:"author" firestore:"author"`
	Price     string `json:"price" firestore:"price"`
	Contact   string `json:"contact" firestore:"contact"`
	UserClass string `json:"userClass" firestore:"userClass"`
	IsOnWa    bool   `json:"isOnWa" firestore:"isOnWa"`
	UID       string `json:"uid" firestore:"uid"`
	Email     string `json:"email" firestore:"email"`
	Username  string `json:"username" firestore:"username"`
	Year      string `json:"year" firestore:"year"`
	Branch    string `json:"branch" firestore:"branch"`
	ImageURL  string `json:"imageURL" firestore:"imageURL"`
	FileID    string `json:"fileID" firestore:"fileID"`
}

// PostReqData represents the data to be received in a post request
type PostReqData struct {
	IDToken string   `json:"idToken"`
	Data    Textbook `json:"data"`
}

// DelReqData represents the data to be received in a del request
type DelReqData struct {
	IDToken string `json:"idToken"`
	ID      string `json:"bookID"`
}
