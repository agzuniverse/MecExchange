package algolia

import (
	"github.com/algolia/algoliasearch-client-go/algoliasearch"
)

// Client contains everything necessary to interact with algolia
type Client struct {
	Client algoliasearch.Client
	Index  algoliasearch.Index
}

// NewClient returns new algolia client
func NewClient() *Client {
	return new(Client)
}

// Init initialize the connection to Algolia
func (client *Client) Init(apiID, apiKey, indexName string) {
	client.Client = algoliasearch.NewClient(apiID, apiKey)
	client.Index = client.Client.InitIndex(indexName)
}

// AddObject adds the object to the algolia index
func (client *Client) AddObject(obj map[string]interface{}) {
	client.Index.AddObject(obj)
}

// DeleteObject deletes the object from the algolia index
func (client *Client) DeleteObject(id string) {
	client.Index.DeleteObject(id)
}
