import crypto from "crypto";

export function hashSha256(input) {
    return crypto.createHash("sha256").update(input).digest("hex");
}
