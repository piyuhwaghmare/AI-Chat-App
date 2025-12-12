# Hugging Face Token Setup Guide

## Step 1: Create Your Token

1. Go to https://huggingface.co/settings/tokens
2. Click "New token"
3. Give it a name (e.g., "Chat App")
4. **IMPORTANT**: Select "Read" access AND enable "Make calls to the serverless Inference API"
5. Click "Generate token"
6. Copy the token (it starts with `hf_`)

## Step 2: Create .env File

Create a file named `.env` in the `backend` folder with the following content:

```
MONGO_URI=mongodb://localhost:27017/chat_saved
PORT=5000
HF_TOKEN=hf_your_actual_token_here
```

**Replace `hf_your_actual_token_here` with your actual token from Step 1.**

## Step 3: Test Your Token

Run the diagnostic test:

```bash
cd backend
node test-token.js
```

This will check:
- ✅ If token exists
- ✅ If token format is correct
- ✅ If token works with the API
- ✅ If token has correct permissions

## Common Issues

### Issue 1: "HF_TOKEN is not set"
**Solution**: Make sure you created the `.env` file in the `backend` folder (not the root folder)

### Issue 2: "401 Unauthorized"
**Solution**: 
- Check if your token is correct (copy-paste it again)
- Make sure the token starts with `hf_`
- Verify the token hasn't expired
- Regenerate a new token if needed

### Issue 3: "403 Forbidden"
**Solution**: 
- Go to https://huggingface.co/settings/tokens
- Click on your token
- Enable "Make calls to the serverless Inference API" permission
- Save and try again

### Issue 4: Token works in test but not in app
**Solution**: 
- Make sure you restarted your server after creating/updating the `.env` file
- Check that you're running the server from the `backend` folder
- Verify `dotenv` is installed: `npm install dotenv`

## Verify Your Setup

1. ✅ `.env` file exists in `backend/` folder
2. ✅ `HF_TOKEN` is set in `.env` file
3. ✅ Token starts with `hf_`
4. ✅ Token has Inference API permissions enabled
5. ✅ Server restarted after creating `.env` file
6. ✅ `test-token.js` passes all checks

## Still Having Issues?

Run the test script and check the error messages. They will tell you exactly what's wrong:

```bash
cd backend
node test-token.js
```

The output will guide you to the specific issue.

## Important: Inference Provider Setup (Optional)

If you see "No Inference Provider available" errors, you have two options:

### Option 1: Use the Router Endpoint (Current Implementation) ✅
The code now uses `https://router.huggingface.co` directly, which works without setting up inference providers. This is the recommended approach.

### Option 2: Configure Inference Providers (If you want to use HfInference library)
1. Go to https://huggingface.co/settings/inference-providers
2. Enable "Serverless Inference" or "Inference Endpoints"
3. The code will automatically use the configured provider

**Note**: The current implementation uses Option 1 (router endpoint), so you don't need to configure providers unless you specifically want to use the HfInference library.

