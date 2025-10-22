import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import coupleResult3 from '@/assets/couple-result-3.jpg';

interface SoulmateInterludeProps {
  onContinue: () => void;
}

export const SoulmateInterlude = ({ onContinue }: SoulmateInterludeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto px-4"
    >
      <Card className="p-8 border-primary/30 bg-card/50 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient-gold">
            ✨ Success Story ✨
          </h2>
          
          <p className="text-lg text-muted-foreground mb-6">
            Thousands of people have already found true love through Seraphine. 
            <span className="text-secondary font-semibold"> You could be next!</span>
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <p className="text-3xl font-bold text-secondary">94%</p>
              <p className="text-sm text-muted-foreground">Real connection rate</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <p className="text-3xl font-bold text-secondary">50k+</p>
              <p className="text-sm text-muted-foreground">Couples formed</p>
            </div>
          </div>

          <div className="pt-6">
            <img 
              src={coupleResult3} 
              alt="Jessica & David - Real couple who found love"
              className="w-full max-w-md h-64 object-contain bg-muted/50 rounded-lg mx-auto border-4 border-primary/30 mb-4"
            />
            <p className="text-sm italic text-muted-foreground mb-2">
              "When I saw the drawing, I cried. When I met him, I cried again."
            </p>
            <p className="text-xs text-muted-foreground">- Jessica & David</p>
          </div>

          <Button
            onClick={onContinue}
            size="lg"
            className="w-full gradient-mystical text-lg py-6 hover:opacity-90"
          >
            Continue Discovering <Heart className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </Card>
    </motion.div>
  );
};
