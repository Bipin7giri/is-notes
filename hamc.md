HMAC (Hash-based Message Authentication Code) is a mechanism that combines a cryptographic hash function with a secret key to provide message integrity and authenticity. It ensures that a message has not been altered and is from a legitimate sender who possesses the shared secret key.

### Key Features of HMAC:

1. **Combines Hashing with Secret Key**:
   - HMAC uses a hash function (e.g., SHA-256) combined with a secret key to produce a unique code for each message.

2. **Provides Message Authentication**:
   - Ensures that the message has not been tampered with and verifies the sender’s authenticity.

3. **Resistant to Common Attacks**:
   - HMAC is designed to be resistant to common cryptographic attacks, such as collision attacks and brute-force attacks.

### How HMAC Works:

1. **Key Preparation**:
   - **Key Size**: If the key is longer than the hash function's block size, it is hashed to produce a shorter key. If the key is shorter than the block size, it is padded with zeros.

2. **Create Two Keys**:
   - **Key Pad**: The key is divided into two pads, **ipad** (inner pad) and **opad** (outer pad), which are XORed with the key.
     - **ipad**: The key XORed with a repeated byte of 0x36.
     - **opad**: The key XORed with a repeated byte of 0x5C.

3. **Hashing Process**:
   - **Inner Hash**: Concatenate **ipad** with the original message and hash the result.
   - **Outer Hash**: Concatenate **opad** with the hash result from the inner hash step and hash this result to produce the final HMAC.

### Steps to Compute HMAC:

1. **Prepare the Key**:
   - If the key length exceeds the block size of the hash function, hash the key to shorten it.
   - If the key is shorter, pad it to the block size.

2. **Generate Pads**:
   - **ipad**: XOR the key with 0x36.
   - **opad**: XOR the key with 0x5C.

3. **Calculate Inner Hash**:
   - Compute the hash of **ipad** concatenated with the message.

4. **Calculate Outer Hash**:
   - Compute the hash of **opad** concatenated with the inner hash result.

### Example:

Here’s a simplified example using SHA-256 as the hash function:

1. **Prepare Key**:
   - Suppose the key is `key`, and the hash function block size is 64 bytes.

2. **Generate Pads**:
   - **ipad**: Key XORed with 0x36 (repeated 64 bytes).
   - **opad**: Key XORed with 0x5C (repeated 64 bytes).

3. **Inner Hash Calculation**:
   - Concatenate **ipad** with the message and compute the SHA-256 hash.

4. **Outer Hash Calculation**:
   - Concatenate **opad** with the result from the inner hash, and compute the SHA-256 hash again to get the final HMAC.

### Example Code in Python:

```python
import hashlib

def hmac_sha256(key, message):
    block_size = 64  # For SHA-256
    if len(key) > block_size:
        key = hashlib.sha256(key).digest()
    key = key.ljust(block_size, b'\x00')
    
    ipad = bytes((x ^ 0x36) for x in key)
    opad = bytes((x ^ 0x5C) for x in key)
    
    inner_hash = hashlib.sha256(ipad + message).digest()
    return hashlib.sha256(opad + inner_hash).hexdigest()

key = b'secret_key'
message = b'This is a message'
hmac_value = hmac_sha256(key, message)
print(hmac_value)
```

### Summary:

HMAC combines a cryptographic hash function with a secret key to produce a message authentication code. It involves preparing the key, generating inner and outer pads, and hashing the message in two steps to ensure data integrity and authenticity. HMAC is widely used for secure communication and data verification due to its robustness against common attacks.