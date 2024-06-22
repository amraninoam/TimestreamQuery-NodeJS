# Timestream Query Node.js Application

This is a Node.js application that queries an AWS Timestream database and prints the results.

## Prerequisites

- Node.js (version 14 or later)
- AWS CLI configured with the appropriate profile
- Docker (optional, for containerized deployment)

## Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/your-repo/timestream-query-nodejs.git
    cd timestream-query-nodejs
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root of the project and add the following environment variables:

    ```plaintext
    dbName=your_db_name
    tableName=your_table_name
    profile=your_aws_profile
    rows=number_of_rows
    endpointURL=your_timestream_endpoint_url
    ```

## Running the Application

To run the application:

```sh
node index.js
