-- AlterTable: añadir campos de integración Meta Ads al modelo User.
-- Todos los campos son nullable — no hay data loss en registros existentes.
ALTER TABLE "User" ADD COLUMN "metaUserId"          TEXT;
ALTER TABLE "User" ADD COLUMN "metaAccessToken"     TEXT;
ALTER TABLE "User" ADD COLUMN "metaAdAccountId"     TEXT;
ALTER TABLE "User" ADD COLUMN "metaConnectedAt"     TIMESTAMP(3);
ALTER TABLE "User" ADD COLUMN "metaTokenExpiresAt"  TIMESTAMP(3);
ALTER TABLE "User" ADD COLUMN "metaTokenScopes"     TEXT;
ALTER TABLE "User" ADD COLUMN "metaTokenType"       TEXT;

-- CreateIndex: unique constraint para metaUserId
CREATE UNIQUE INDEX "User_metaUserId_key" ON "User"("metaUserId");

-- CreateIndex: índice para búsqueda rápida en callback OAuth
CREATE INDEX "User_metaUserId_idx" ON "User"("metaUserId");
