-- Create function to increment media likes count
CREATE OR REPLACE FUNCTION increment_media_likes(media_id_param TEXT, ip_address_param TEXT)
RETURNS TABLE(success BOOLEAN, new_likes_count INTEGER) AS $$
DECLARE
  current_count INTEGER;
  is_already_liked BOOLEAN;
BEGIN
  -- Check if this IP has already liked this media
  SELECT EXISTS(
    SELECT 1 FROM media_likes 
    WHERE media_id = media_id_param AND ip_address = ip_address_param
  ) INTO is_already_liked;
  
  IF is_already_liked THEN
    -- Unlike: Remove the like
    DELETE FROM media_likes 
    WHERE media_id = media_id_param AND ip_address = ip_address_param;
    
    -- Get new count
    SELECT COUNT(*) FROM media_likes WHERE media_id = media_id_param INTO current_count;
    
    RETURN QUERY SELECT TRUE, current_count;
  ELSE
    -- Like: Add the like
    INSERT INTO media_likes (media_id, ip_address) 
    VALUES (media_id_param, ip_address_param);
    
    -- Get new count
    SELECT COUNT(*) FROM media_likes WHERE media_id = media_id_param INTO current_count;
    
    RETURN QUERY SELECT TRUE, current_count;
  END IF;
  
EXCEPTION WHEN OTHERS THEN
  RETURN QUERY SELECT FALSE, 0;
END;
$$ LANGUAGE plpgsql;

-- Create function to get media likes count
CREATE OR REPLACE FUNCTION get_media_likes_count(media_id_param TEXT)
RETURNS INTEGER AS $$
DECLARE
  likes_count INTEGER;
BEGIN
  SELECT COUNT(*) FROM media_likes WHERE media_id = media_id_param INTO likes_count;
  RETURN COALESCE(likes_count, 0);
END;
$$ LANGUAGE plpgsql;

-- Create function to get media comments count
CREATE OR REPLACE FUNCTION get_media_comments_count(media_id_param TEXT)
RETURNS INTEGER AS $$
DECLARE
  comments_count INTEGER;
BEGIN
  SELECT COUNT(*) FROM media_comments WHERE media_id = media_id_param INTO comments_count;
  RETURN COALESCE(comments_count, 0);
END;
$$ LANGUAGE plpgsql;
