# terraform/signaling.tf

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"

  default_tags {
    tags = {
      app = "hegemony-app"
    }
  }
}

locals {
  # TypeScript compiler output directory (tsc outDir)
  tsc_out_dir = "${path.module}/dist"
}

# DynamoDB Table
resource "aws_dynamodb_table" "hegemony" {
  name         = "hegemony"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "code"

  attribute {
    name = "code"
    type = "S"
  }

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }
}

resource "aws_dynamodb_table" "connections" {
  name         = "hegemony-connections"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "connectionId"

  attribute {
    name = "connectionId"
    type = "S"
  }

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }
}


# Lambda IAM Role
resource "aws_iam_role" "lambda_role" {
  name = "hegemony-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy" "lambda_policy" {
  name = "hegemony-lambda-policy"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:DeleteItem",
          "dynamodb:UpdateItem",
          "dynamodb:Query"
        ]
        Resource = [
          aws_dynamodb_table.hegemony.arn,
          aws_dynamodb_table.connections.arn
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Effect = "Allow"
        Action = [
          "execute-api:ManageConnections"
        ]
        Resource = "${aws_apigatewayv2_api.hegemony.execution_arn}/*"
      }
    ]
  })
}


# Lambda Function
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${local.tsc_out_dir}"
  output_path = "${path.module}/signaling-lambda.zip"
}

resource "aws_lambda_function" "hegemony" {
  filename         = data.archive_file.lambda_zip.output_path
  function_name    = "hegemony"
  role             = aws_iam_role.lambda_role.arn
  handler          = "index.handler"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  runtime          = "nodejs20.x"
  timeout          = 10

  environment {
    variables = {
      TABLE_NAME        = aws_dynamodb_table.hegemony.name
      CONNECTIONS_TABLE = aws_dynamodb_table.connections.name
    }
  }
}


# API Gateway - WebSocket
resource "aws_apigatewayv2_api" "hegemony" {
  name                       = "hegemony-api"
  protocol_type              = "WEBSOCKET"
  route_selection_expression = "$request.body.action"
}

resource "aws_apigatewayv2_integration" "hegemony" {
  api_id             = aws_apigatewayv2_api.hegemony.id
  integration_type   = "AWS_PROXY"
  integration_uri    = aws_lambda_function.hegemony.invoke_arn
  integration_method = "POST"
  content_handling_strategy = "CONVERT_TO_TEXT"
}

resource "aws_apigatewayv2_integration_response" "hegemony" {
  api_id                   = aws_apigatewayv2_api.hegemony.id
  integration_id           = aws_apigatewayv2_integration.hegemony.id
  integration_response_key = "/default/"
}

resource "aws_apigatewayv2_route" "connect" {
  api_id    = aws_apigatewayv2_api.hegemony.id
  route_key = "$connect"
  target    = "integrations/${aws_apigatewayv2_integration.hegemony.id}"
}

resource "aws_apigatewayv2_route_response" "connect" {
  api_id             = aws_apigatewayv2_api.hegemony.id
  route_id           = aws_apigatewayv2_route.connect.id
  route_response_key = "$default"
}

resource "aws_apigatewayv2_route" "disconnect" {
  api_id    = aws_apigatewayv2_api.hegemony.id
  route_key = "$disconnect"
  target    = "integrations/${aws_apigatewayv2_integration.hegemony.id}"
}

resource "aws_apigatewayv2_route_response" "disconnect" {
  api_id             = aws_apigatewayv2_api.hegemony.id
  route_id           = aws_apigatewayv2_route.disconnect.id
  route_response_key = "$default"
}

resource "aws_apigatewayv2_route" "default" {
  api_id    = aws_apigatewayv2_api.hegemony.id
  route_key = "$default"
  target    = "integrations/${aws_apigatewayv2_integration.hegemony.id}"
}

resource "aws_apigatewayv2_route_response" "default" {
  api_id             = aws_apigatewayv2_api.hegemony.id
  route_id           = aws_apigatewayv2_route.default.id
  route_response_key = "$default"
}

resource "aws_apigatewayv2_route" "create" {
  api_id    = aws_apigatewayv2_api.hegemony.id
  route_key = "create"
  target    = "integrations/${aws_apigatewayv2_integration.hegemony.id}"
}

resource "aws_apigatewayv2_route_response" "create" {
  api_id             = aws_apigatewayv2_api.hegemony.id
  route_id           = aws_apigatewayv2_route.create.id
  route_response_key = "$default"
}

resource "aws_apigatewayv2_route" "join" {
  api_id    = aws_apigatewayv2_api.hegemony.id
  route_key = "join"
  target    = "integrations/${aws_apigatewayv2_integration.hegemony.id}"
}

resource "aws_apigatewayv2_route_response" "join" {
  api_id             = aws_apigatewayv2_api.hegemony.id
  route_id           = aws_apigatewayv2_route.join.id
  route_response_key = "$default"
}

resource "aws_apigatewayv2_route" "enter" {
  api_id    = aws_apigatewayv2_api.hegemony.id
  route_key = "enter"
  target    = "integrations/${aws_apigatewayv2_integration.hegemony.id}"
}

resource "aws_apigatewayv2_route_response" "enter" {
  api_id             = aws_apigatewayv2_api.hegemony.id
  route_id           = aws_apigatewayv2_route.enter.id
  route_response_key = "$default"
}

resource "aws_apigatewayv2_route" "message" {
  api_id    = aws_apigatewayv2_api.hegemony.id
  route_key = "message"
  target    = "integrations/${aws_apigatewayv2_integration.hegemony.id}"
}

resource "aws_apigatewayv2_route_response" "message" {
  api_id             = aws_apigatewayv2_api.hegemony.id
  route_id           = aws_apigatewayv2_route.message.id
  route_response_key = "$default"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.hegemony.id
  name        = "prod"
  auto_deploy = true

  default_route_settings {
    throttling_burst_limit = 10
    throttling_rate_limit  = 10
  }

  route_settings {
    route_key              = "$connect"
    throttling_burst_limit = 10
    throttling_rate_limit  = 10
  }

  route_settings {
    route_key              = "$disconnect"
    throttling_burst_limit = 10
    throttling_rate_limit  = 10
  }

  route_settings {
    route_key              = "$default"
    throttling_burst_limit = 10
    throttling_rate_limit  = 10
  }

  route_settings {
    route_key              = "create"
    throttling_burst_limit = 10
    throttling_rate_limit  = 10
  }

  route_settings {
    route_key              = "join"
    throttling_burst_limit = 10
    throttling_rate_limit  = 10
  }

  route_settings {
    route_key              = "enter"
    throttling_burst_limit = 10
    throttling_rate_limit  = 10
  }

  route_settings {
    route_key              = "message"
    throttling_burst_limit = 10
    throttling_rate_limit  = 10
  }

  depends_on = [
    aws_apigatewayv2_route.connect,
    aws_apigatewayv2_route.disconnect,
    aws_apigatewayv2_route.default,
    aws_apigatewayv2_route.create,
    aws_apigatewayv2_route.join,
    aws_apigatewayv2_route.enter,
    aws_apigatewayv2_route.message
  ]
}


resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  function_name = aws_lambda_function.hegemony.function_name
  action        = "lambda:InvokeFunction"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.hegemony.execution_arn}/*/*"
}

output "websocket_endpoint" {
  value = "${aws_apigatewayv2_api.hegemony.api_endpoint}/prod"
}