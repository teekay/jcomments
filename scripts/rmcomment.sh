#!/bin/bash

# Configuration
missing_vars=()

if [ -z "${API_SECRET_KEY}" ]; then
    missing_vars+=("API_SECRET_KEY")
fi

if [ -z "${API_BASE_URL}" ]; then
    missing_vars+=("API_BASE_URL")
fi

if [ -z "${ACCOUNT_ID}" ]; then
    missing_vars+=("ACCOUNT_ID")
fi

if [ ${#missing_vars[@]} -ne 0 ]; then
    echo "Error: Required environment variables are not set:"
    printf '  %s\n' "${missing_vars[@]}"
    echo ""
    echo "Please set them first:"
    echo "  export API_SECRET_KEY='your-secret-key-here'"
    echo "  export API_BASE_URL='https://your-function-app.azurewebsites.net'"
    echo "  export ACCOUNT_ID='your-account-id-here'"
    exit 1
fi

# Function to create HMAC signature
create_signature() {
    local method="$1"
    local url_path="$2"
    local timestamp="$3"
    
    # Create string to sign (same format as server)
    local string_to_sign="${method}\n${url_path}\n${timestamp}"
    
    # Create HMAC signature using sha256
    echo -en "$string_to_sign" | openssl dgst -sha256 -hmac "$API_SECRET_KEY" -hex | sed 's/^.* //'
}

# Function to delete an item
delete_item() {
    local item_id="$1"
    
    if [ -z "$item_id" ]; then
        echo "Error: Item ID is required"
        echo "Usage: $0 delete <item-id>"
        exit 1
    fi
    
    # Create timestamp (seconds since epoch)
    local timestamp=$(date +%s)
    
    # Construct the URL path (must match what's used in signature)
    local url_path="/comments/${item_id}"
    
    # Generate signature
    local signature=$(create_signature "DELETE" "$url_path" "$timestamp")
    
    # Make the DELETE request using curl
    response=$(curl -s -w "\n%{http_code}" \
        -X DELETE \
        -H "x-timestamp: ${timestamp}" \
        -H "x-signature: ${signature}" \
        -H "x-account-id: ${ACCOUNT_ID}" \
        "${API_BASE_URL}${url_path}")
    
    # Extract status code and body
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    # Handle response
    if [ "$http_code" -eq 200 ]; then
        echo "Successfully deleted item ${item_id}"
        [ ! -z "$body" ] && echo "Response: $body"
    else
        echo "Error deleting item ${item_id}"
        echo "Status code: ${http_code}"
        [ ! -z "$body" ] && echo "Error: $body"
        exit 1
    fi
}

# Function to display help
show_help() {
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Commands:"
    echo "  delete <item-id>    Delete an item by ID"
    echo "  help               Show this help message"
    echo ""
    echo "Example:"
    echo "  $0 delete 12345"
}

# Main script logic
case "$1" in
    delete)
        delete_item "$2"
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo "Error: Unknown command '$1'"
        echo ""
        show_help
        exit 1
        ;;
esac